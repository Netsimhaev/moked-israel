import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckoutFlow } from "@/components/checkout/CheckoutFlow";
import { getCheckoutItem } from "@/lib/checkout";
import { getCrossSellSlug } from "@/lib/crossSell";

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ color?: string; error?: string }>;
}) {
  const { slug } = await params;
  const { color, error } = await searchParams;

  const item = getCheckoutItem(slug);
  if (!item) notFound();

  const crossSellSlug = getCrossSellSlug(slug);
  const crossSellItem = crossSellSlug ? getCheckoutItem(crossSellSlug) : undefined;

  return (
    <>
      <Header />
      <main>
        <CheckoutFlow
          item={item}
          crossSellItem={crossSellItem}
          initialColorId={color}
          paymentError={error === "payment_failed"}
        />
      </main>
      <Footer />
    </>
  );
}
