import "@fontsource/space-grotesk";
import "./globals.css";
import { ThemeProvider } from "./ThemeProvider";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "portfolio",
  description: "venkatesh portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-space-grotesk antialiased transition-colors duration-500">
        <ThemeProvider>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
