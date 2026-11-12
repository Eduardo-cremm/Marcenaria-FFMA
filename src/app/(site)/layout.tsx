import { CartDrawer, CartProvider } from "@/components/Cart";
import { CookieNotice } from "@/components/CookieNotice";
import { Footer, WhatsFloat } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageTransition } from "@/components/PageTransition";
import { ScrollFx, SmoothScroll } from "@/components/Motion";
import { SiteProvider } from "@/components/SiteContext";
import { getCompany } from "@/lib/company";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const company = await getCompany();
  return (
    <SiteProvider company={company}>
      <CartProvider>
        <SmoothScroll />
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <WhatsFloat />
        <CookieNotice />
        <PageTransition />
        <div className="grain" aria-hidden="true" />
        <ScrollFx />
      </CartProvider>
    </SiteProvider>
  );
}
