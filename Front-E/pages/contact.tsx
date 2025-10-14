import Contact from "@/components/about/contact";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Head from "next/head";

export default function Login() {
  return (
    <>
      <Head>
        <title>Estilo Esmeralda</title>
      </Head>
      <section>
        <Header />
        <main>
         <Contact />
        </main>
        <Footer />
      </section>
    </>
  );
}
