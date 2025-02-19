"use client"

import * as React from "react"
import Link from "next/link"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

const Navbar = () => {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <nav className="border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold">Quantum Grid</span>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <Link href="/docs">
                            <Button variant="ghost">Docs</Button>
                        </Link>
                        <Link href="/download">
                            <Button variant="ghost">Download</Button>
                        </Link>
                        <Link href="/projects">
                            <Button variant="ghost">Projects</Button>
                        </Link>
                        <Button variant="outline" size="icon" onClick={toggleTheme}>
                            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar

