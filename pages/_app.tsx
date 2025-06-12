import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SesionProvider } from '@/contexts/SesionContext';
import { CarritoProvider } from '@/contexts/CarritoContext';
import { PedidoProvider } from '@/contexts/PedidoContext';
import Layout from '@/components/layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SesionProvider> {/* ✅ Envuelve aquí */}
      <CarritoProvider>
        <PedidoProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PedidoProvider>
      </CarritoProvider>
    </SesionProvider>
  );
}

