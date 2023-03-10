import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { getPokemons } from '../api';
import { useIntersection } from '../hooks/useIntersection';

export interface IPokemons {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}

export const OFFSET = 20;

export default function Pokemon() {
  const { data, fetchNextPage, hasNextPage, isSuccess, isFetchingNextPage } =
    useInfiniteQuery(
      'poke',
      async ({ pageParam = 0 }) => await getPokemons(pageParam, OFFSET),
      {
        getNextPageParam: (lastPage) => {
          const lastOffset = lastPage.results.at(-1)?.url.split('/')[6];
          if (!lastOffset) return false;
          return parseInt(lastOffset, 10) < lastPage.count
            ? parseInt(lastOffset, 10) + 1
            : false;
        },
        staleTime: 1000,
      },
    );

  console.log('data: ', data);

  const fetchMoreRef = useRef<HTMLDivElement>(null);
  const intersecting = useIntersection(fetchMoreRef);

  useEffect(() => {
    if (!intersecting || !isSuccess || !hasNextPage || isFetchingNextPage)
      return;
    fetchNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersecting]);

  return (
    <div>
      <ul>
        {data?.pages.map((page) =>
          page.results.map((poke) => <li key={poke.name}>{poke.name}</li>),
        )}
      </ul>
      <div ref={fetchMoreRef}>Loading.........</div>
    </div>
  );
}
