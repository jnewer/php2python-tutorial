import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "PHP → Python 快速进阶课程",
  description: "专为 PHP 开发者设计的 Python 学习课程，通过对比学习法快速掌握 Python，20 天从入门到精通。",
  keywords: ["Python", "PHP", "编程课程", "对比学习", "Web开发", "编程入门"],
  authors: [{ name: "Z.ai" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <a
          href="#modules"
          className="sr-only focus:not-sr-only focus:fixed focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg focus:outline-none"
          style={{ top: 'max(0.75rem, env(safe-area-inset-top, 0px))', left: 'max(0.75rem, env(safe-area-inset-left, 0px))' }}
        >
          跳到课程内容
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
