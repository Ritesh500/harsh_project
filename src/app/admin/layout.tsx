import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · Mekhas",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-ivory-deep/40">{children}</div>;
}
