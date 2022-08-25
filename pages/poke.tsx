import { GetServerSideProps, GetStaticProps } from 'next';
import React from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { getPokemons } from '../api';
import Pokemon, { OFFSET } from '../components/Pokemon';

export default function poke() {
  return <Pokemon />;
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(
    'poke',
    () => getPokemons(0, OFFSET),
    {
      staleTime: 1000,
    },
  );

  //? 직렬화 과정에서 문제가 발생할 수 있으므로 JSON 문자열로 변환 뒤 파싱 후 보낸다.
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
