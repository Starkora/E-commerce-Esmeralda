import Footer from "@/components/footer";
import Header from "@/components/header";
import LoginSection from "@/components/login_components/sectionlogin";
import RegisterSection from "@/components/register_components/sectionregister";
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
          <RegisterSection />
        </main>
        <Footer />
      </section>
    </>
  );
}
