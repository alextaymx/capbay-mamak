import CartOverview from "@components/cart/CartOverview";
import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import { Hero } from "@components/Hero";
import { OrderMenu } from "@components/order-menu/OrderMenu";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>CapBay Mamak - Ordering made simple for small mamak</title>
        <meta name="description" content="This is a just a t" />
      </Head>
      <Header />
      <main>
        <Hero />
        <OrderMenu />

        <CartOverview />

        {/* 
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs /> */}
      </main>
      <Footer />
    </>
  );
}
