import { Center, Container, Title } from '@mantine/core';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { generateData } from '../api/generateTableData';
import { DataTable } from '../components/DataTable/DataTable';
import type { Users } from '../types/User';


type Props = {
  users: Users;
};

export default function Home({ users }: Props) {
  return (
    <>
      <Head>
        <title>{"SrBrahma's Assessment"}</title>
      </Head>
      <Container fluid p='lg'>
        <Center py='lg'>
          <Title order={1}>{'Challenge'}</Title>
        </Center>
        <DataTable users={users}/>
      </Container>
    </>
  );
}

// https://stackoverflow.com/a/65760948
// eslint-disable-next-line
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      users: generateData({ number: 4 }),
    },
  };
};