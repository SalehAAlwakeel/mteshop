import { CarHero } from "@/components/CarHero";
import { CarOrder } from "@/components/CarOrder";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ part?: string }>;
}) {
  const { part } = await searchParams;

  return (
    <>
      <CarHero />
      <CarOrder initialPart={part} />
    </>
  );
}
