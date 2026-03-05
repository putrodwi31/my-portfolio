import type { Metadata } from "next";
import { ReactQueryProvider } from "@/components/providers/react-query-provider";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ReactElement } from "react";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

const plusJakartaSans: NextFontWithVariable = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
    title: "Portfolio Putro Dwi Mulyo",
    description: "Portfolio profesional Putro Dwi Mulyo. Temukan proyek web development, dan cloud computing",
    keywords: ["Putro Dwi Mulyo", "Portfolio", "Full Stack Web Developer", "Cloud Engineer"],
    authors: [{ name: "Putro Dwi Mulyo" }],
    creator: "Putro Dwi Mulyo",
    metadataBase: new URL("https://putrodwi.my.id"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Putro Dwi Mulyo | Full Stack Web Developer & Cloud Engineer",
        description: "Kunjungi portfolio Putro Dwi Mulyo, web developer dan cloud engineer profesional Indonesia.",
        url: "https://putrodwi.my.id/",
        siteName: "Portfolio Putro Dwi Mulyo",
        locale: "id_ID",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Putro Dwi Mulyo | Full Stack Web Developer & Cloud Engineer",
        description: "Kenali Putro Dwi Mulyo, developer & cloud engineer profesional. Temukan karya, keahlian, dan cara berkolaborasi.",
        creator: "@putrodwi31",
    },
    icons: {
        apple: "/assets/favicon.ico",
        icon: "/assets/favicon.ico",
    },
    manifest: "/site.webmanifest",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): ReactElement {
    return (
        <html lang="en" className="overflow-x-hidden" suppressHydrationWarning>
            <body
                suppressHydrationWarning
                className={`${plusJakartaSans.variable} bg-bg font-sans text-muted antialiased selection:bg-white selection:text-black`}
            >
                <ReactQueryProvider>{children}</ReactQueryProvider>
            </body>
        </html>
    );
}
