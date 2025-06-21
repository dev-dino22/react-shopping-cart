import { useEffect, useState } from "react";

type CacheEntry<T> = {
  data: T | null;
  error: Error | null;
  status: "idle" | "loading" | "success" | "error";
  lastUpdated: number;
  staleTime: number;
  cacheTime: number;
};

type DataStoreState = {
  cache: Record<string, CacheEntry<any>>;
  activeFetches: Record<string, Promise<any>>;
};

type FetchOptions = {
  staleTime?: number;
  cacheTime?: number;
  enabled?: boolean;
};

const DEFAULT_OPTIONS: Required<FetchOptions> = {
  staleTime: 5 * 60 * 1000,
  cacheTime: 10 * 60 * 1000,
  enabled: true,
};

// GPT와 춤을 추며 구현한...
// 옵저버 패턴 기반의 캐싱 시스템 통합 데이터 패칭 전역 스토어
class DataStore {
  private state: DataStoreState = {
    cache: {},
    activeFetches: {},
  };

  private listeners: Set<() => void> = new Set();

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  // 구독 관리
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getSnapshot(): DataStoreState {
    return this.state;
  }

  // Suspense를 위한 데이터 읽기 메서드
  // 이 메서드는 캐시가 유효하면 데이터를 반환하고, 그렇지 않으면 fetcher를 호출하여 데이터를 가져옵니다.
  read<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: FetchOptions = {}
  ): T {
    const currentEntry = this.state.cache[key];
    const now = Date.now();

    // 1. 캐시가 유효하면 데이터 반환
    if (
      currentEntry?.status === "success" &&
      now - currentEntry.lastUpdated <
        (options.staleTime || DEFAULT_OPTIONS.staleTime)
    ) {
      return currentEntry.data as T;
    }

    // 2. 이미 요청 중이면 해당 프로미스 throw (Suspense가 캐치)
    if (Object.prototype.hasOwnProperty.call(this.state.activeFetches, key)) {
      throw this.state.activeFetches[key];
    }

    // 3. 유효한 캐시가 없으면 새 요청 시작
    const fetchPromise = this.fetchData(key, fetcher, options);
    throw fetchPromise;
  }

  // Suspense를 위한 프리페치 메서드
  preload<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: FetchOptions = {}
  ): void {
    const currentEntry = this.state.cache[key];
    const now = Date.now();

    // 캐시가 유효하지 않으면 미리 요청 시작
    if (
      !currentEntry ||
      currentEntry.status !== "success" ||
      now - currentEntry.lastUpdated >=
        (options.staleTime || DEFAULT_OPTIONS.staleTime)
    ) {
      this.fetchData(key, fetcher, options);
    }
  }

  // 데이터 패칭
  async fetchData<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: FetchOptions = {}
  ): Promise<T> {
    const {
      staleTime = DEFAULT_OPTIONS.staleTime,
      cacheTime = DEFAULT_OPTIONS.cacheTime,
      enabled = DEFAULT_OPTIONS.enabled,
    } = options;

    if (!enabled) {
      return this.getData<T>(key) as T;
    }

    const currentEntry = this.state.cache[key];
    const now = Date.now();

    // 캐시 유효성 검사
    if (
      currentEntry?.status === "success" &&
      now - currentEntry.lastUpdated < staleTime
    ) {
      return currentEntry.data as T;
    }

    // 중복 요청 방지
    if (Object.prototype.hasOwnProperty.call(this.state.activeFetches, key)) {
      return this.state.activeFetches[key] as Promise<T>;
    }

    try {
      // 상태 업데이트: 로딩 시작
      this.state = {
        ...this.state,
        cache: {
          ...this.state.cache,
          [key]: {
            ...(currentEntry || {
              data: null,
              error: null,
              status: "idle",
              lastUpdated: 0,
              staleTime,
              cacheTime,
            }),
            status: "loading",
          },
        },
      };
      this.notify();

      // 요청 실행
      const fetchPromise = fetcher();
      this.state.activeFetches[key] = fetchPromise;

      const data = await fetchPromise;

      // 상태 업데이트: 성공
      this.state = {
        ...this.state,
        cache: {
          ...this.state.cache,
          [key]: {
            data,
            error: null,
            status: "success",
            lastUpdated: Date.now(),
            staleTime,
            cacheTime,
          },
        },
        activeFetches: Object.fromEntries(
          Object.entries(this.state.activeFetches).filter(([k]) => k !== key)
        ),
      };
      this.notify();

      return data;
    } catch (error) {
      // 상태 업데이트: 실패
      this.state = {
        ...this.state,
        cache: {
          ...this.state.cache,
          [key]: {
            ...(currentEntry || {
              data: null,
              error: null,
              status: "idle",
              lastUpdated: 0,
              staleTime,
              cacheTime,
            }),
            error: error as Error,
            status: "error",
          },
        },
        activeFetches: Object.fromEntries(
          Object.entries(this.state.activeFetches).filter(([k]) => k !== key)
        ),
      };
      this.notify();
      throw error;
    }
  }

  // 데이터 수동 설정 (낙관적 업데이트)
  setData<T>(key: string, data: T, options: FetchOptions = {}) {
    const {
      staleTime = DEFAULT_OPTIONS.staleTime,
      cacheTime = DEFAULT_OPTIONS.cacheTime,
    } = options;

    this.state = {
      ...this.state,
      cache: {
        ...this.state.cache,
        [key]: {
          data,
          error: null,
          status: "success",
          lastUpdated: Date.now(),
          staleTime,
          cacheTime,
        },
      },
    };
    this.notify();
  }

  // 데이터 조회
  getData<T>(key: string): T | null {
    return (this.state.cache[key]?.data as T) ?? null;
  }

  // 캐시 무효화
  invalidate(key: string) {
    if (this.state.cache[key]) {
      this.state = {
        ...this.state,
        cache: {
          ...this.state.cache,
          [key]: {
            ...this.state.cache[key],
            lastUpdated: 0,
          },
        },
      };
      this.notify();
    }
  }

  // 스토어 초기화
  reset() {
    this.state = {
      cache: {},
      activeFetches: {},
    };
    this.notify();
  }
}

// 전역 스토어 인스턴스 (싱글톤)
export const dataStore = new DataStore();

export function useDataStore() {
  const [state, setState] = useState(dataStore.getSnapshot());

  useEffect(() => {
    const unsubscribe = dataStore.subscribe(() => {
      setState(dataStore.getSnapshot());
    });
    return unsubscribe;
  }, []);

  return {
    state,
    fetchData: dataStore.fetchData.bind(dataStore),
    setData: dataStore.setData.bind(dataStore),
    getData: dataStore.getData.bind(dataStore),
    invalidate: dataStore.invalidate.bind(dataStore),
    reset: dataStore.reset.bind(dataStore),
    read: dataStore.read.bind(dataStore),
    preload: dataStore.preload.bind(dataStore),
  };
}
