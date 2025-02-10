import Image from "next/image"
import Link from "next/link"
import Navbar from "../components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
	return (
		<div className="min-h-screen bg-background">
			<Navbar />

			<main className="container mx-auto px-4 py-16">
				<div className="text-center mb-16">
					<h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Quantum Grid</h1>
					<p className="text-xl text-muted-foreground">Harness the power of distributed computing for your projects</p>
				</div>

				<div className="flex justify-center mb-16">
					<Image
						src="/placeholder.svg?height=300&width=300"
						alt="Volunteer Computing Framework Logo"
						width={300}
						height={300}
						priority
						className="rounded-full shadow-lg" />
				</div>

				<div className="grid gap-8 md:grid-cols-3 mb-16">
					<Card>
						<CardHeader>
							<CardTitle>Distributed Computing</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>Harness the power of volunteers&apos; computers to solve complex problems.</CardDescription>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Easy Integration</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>Simple API for integrating your project with the framework.</CardDescription>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Secure & Efficient</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>Built with security and efficiency in mind for optimal performance.</CardDescription>
						</CardContent>
					</Card>
				</div>

				<div className="flex justify-center space-x-4">
					<Link href="/docs">
						<Button variant="default">Documentation</Button>
					</Link>
					<Link href="/download">
						<Button variant="default">Download</Button>
					</Link>
					<Link href="/projects">
						<Button variant="default">Projects</Button>
					</Link>
				</div>
			</main>
		</div>
	)
}

