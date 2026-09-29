import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "VetThread Voice",
  description: "Speak the story. Bring your vet the thread.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}