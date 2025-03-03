// import { Button } from "@/components/ui/button"
import { useLanguage } from '../ui/LanguageContext';

export function Home() {
    const { translations } = useLanguage();

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-primary mb-6">
                    {translations.title}
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    {translations.homeDescription}
                </p>
                {/* <div className="flex justify-center space-x-4">
                    <a href="https://quantumgrid.info" target="_blank" rel="noopener noreferrer" className="cursor-pointer">{translations.learnMore}</a>
                    <Button size="lg" variant="outline">
                        {translations.getStarted}
                    </Button>
                </div> */}
            </div>
        </section>
    )
}

export default Home

