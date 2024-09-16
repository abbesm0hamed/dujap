import { QueryClient, QueryObserver } from '@tanstack/query-core';
import { getBaseUrl } from './index.utils.ts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

export function createQuery<T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  options: any = {}
) {
  return new QueryObserver(queryClient, {
    queryKey,
    queryFn,
    ...options,
  });
}

export async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(`${getBaseUrl(url)}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} `);
  }

  return response.json();
}

// export function prefetchQuery(queryKey: string[], queryFn: () => Promise<any>) {
//   return queryClient.prefetchQuery(queryKey, queryFn);
// }
