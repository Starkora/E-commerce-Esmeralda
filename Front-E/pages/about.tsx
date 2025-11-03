import About from "@/components/about/about";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Head from "next/head";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>Sobre Nosotros - Estilo Esmeralda | Moda Peruana de Calidad</title>
        <meta name="description" content="Conoce la historia de Estilo Esmeralda, líder en moda peruana desde 2014. Calidad, estilo y compromiso sostenible en cada prenda." />
        <meta name="keywords" content="estilo esmeralda, moda peruana, ropa de calidad, tiendas de moda, fashion peru" />
      </Head>
      <section>
        <Header />
        <main>
         <About />
        </main>
        <Footer />
      </section>
    </>
  );
}
