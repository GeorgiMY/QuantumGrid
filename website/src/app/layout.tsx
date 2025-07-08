import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "Distributed Computing Framework",
    description: "A modern framework for distributed computing. Scale horizontally with ease.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
                />
                <script src="https://analytics.ahrefs.com/analytics.js" data-key="44b2Hi6i6fhcb8Iudo3k/A" async></script>
            </head>
            <body suppressHydrationWarning className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <Navbar />
                    <main className="sm:container mx-auto w-[90vw] h-auto scroll-smooth">
                        {children}
                    </main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    )
}

