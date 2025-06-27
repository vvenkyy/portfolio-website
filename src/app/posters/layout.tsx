import React from "react";

export default function PostersLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return <div key={params.slug}>{children}</div>;
} 