import React from 'react';

import {GetServerSidePropsContext} from 'next';
import Head from 'next/head';

import {ServerListComponent} from 'src/components/organisms/ServerList/ServerList';

import cookie from 'cookie';

type HomeAppProps = {
  signIn: boolean;
};

const HomeApp: React.FC<HomeAppProps> = ({signIn}) => {
  return (
    <div>
      <Head>
        <title>Myriad Federated</title>
        <meta name="description" content="Myriad Federated" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <ServerListComponent signIn={signIn} />
    </div>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookies = cookie.parse(context?.req?.headers?.cookie ?? '');
  const server = cookies?.session;

  let signIn = false;

  try {
    const data = JSON.parse(server);
    if (data?.currentAddress) signIn = true;
  } catch {
    // ignore
  }

  return {
    props: {
      signIn,
    },
  };
};

export default HomeApp;
