import Head from 'next/head';
import Body from '@/components/body';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Slider from '@/components/slider';
import VerifiedBanner from '@/components/VerifiedBanner';

export default function Home() {
  return (
    <>
      <Head>
        <title>Estilo Esmeralda</title>
      </Head>
      <section>
        <VerifiedBanner />
        <Header />
        <main>
          {/* Aquí el contenido de tu página */}
          <Slider />
          <Body />
        </main>
        <Footer />
      </section>
    </>
  );
}
