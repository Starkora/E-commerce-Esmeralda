import Footer from "@/components/footer";
import Header from "@/components/header";
import LoginSection from "@/components/login_components/sectionlogin";
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
          <LoginSection />
        </main>
        <Footer />
      </section>
    </>
  );
}
