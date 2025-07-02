import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react";
import { SesionProvider } from '@/contexts/SesionContext';
import { CarritoProvider } from '@/contexts/CarritoContext';
import { PedidoProvider } from '@/contexts/PedidoContext';
import Layout from '@/components/layout/Layout';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <SesionProvider> {/* ✅ Envuelve aquí */}
        <CarritoProvider>
          <PedidoProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </PedidoProvider>
        </CarritoProvider>
      </SesionProvider>
    </SessionProvider>
  );
}

