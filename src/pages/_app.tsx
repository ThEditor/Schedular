import { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import '@/styles/globals.css';

import { StoreProvider } from '@/lib/utils/Store';

import Layout from '@/components/layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <StoreProvider>
      {['404','/about'].includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
      <Layout>
        <Component {...pageProps} />
      </Layout>
      )}
    </StoreProvider>
  );
}

export default MyApp;
