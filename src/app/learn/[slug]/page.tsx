import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  // Filled from the concept registry in phase 2. Static export needs at least one param.
  return [{ slug: "verb-position-2" }];
}

export default async function ConceptPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slug) notFound();
  return <h1 className="text-2xl font-semibold">{slug}</h1>;
}
