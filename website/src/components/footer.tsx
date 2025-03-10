import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="border-t w-full h-16" >
            <div className="container flex items-center sm:justify-between justify-center sm:gap-0 gap-4 h-full text-muted-foreground text-sm flex-wrap sm:py-0 py-3 max-sm:px-4" >
                <div className="flex items-center gap-3" >
                    <Image className="sm:block hidden w-8 h-8 text-muted-foreground" src={"/icon.png"} alt={""} width={32} height={32} />
                    <p className="text-center" >
                        The source code is available on
                        <Link
                            href="https://github.com/GeorgiMY/QuantumGrid/"
                            className="px-1 underline underline-offset-2" >
                            GitHub
                        </Link>
                    </p>
                </div>

                <div className="gap-4 items-center hidden md:flex">
                    <FooterButtons />
                </div>
            </div>
        </footer>
    );
}

export function FooterButtons() {
    return (
        <>
        </>
    );
}
