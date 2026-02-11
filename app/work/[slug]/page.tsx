import { works } from "@/data/work";
import { notFound } from "next/navigation";
import { CaseStudyClient } from "./case-study-client";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) return { title: "Not Found" };
  return {
    title: `${work.title} | PANchenko`,
    description: work.shortDesc,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) notFound();

  return <CaseStudyClient work={work} />;
}
