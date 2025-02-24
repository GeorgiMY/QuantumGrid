// Header.tsx
import { PlusCircle, Network, Cpu, ChevronDown } from "lucide-react";
import { useLanguage } from '../ui/LanguageContext';
import type { LanguageCode } from '../ui/LanguageContext';
import { useState } from "react";

interface HeaderProps {
    setPage: (page: string) => void;
}

const languages: { name: string; code: LanguageCode }[] = [
    { name: "English", code: "en" },
    { name: "Български", code: "bg" },
    { name: "中文", code: "zh" },
    { name: "Português", code: "pt" },
    { name: "Português (Brasil)", code: "pt-br" },
    { name: "Español", code: "es" },
    { name: "日本語", code: "ja" },
];

function Header({ setPage }: HeaderProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { language, setLanguage, translations } = useLanguage();

    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

    const handleLanguageSelect = (languageOption: { code: LanguageCode }) => {
        setLanguage(languageOption.code);
        setIsDropdownOpen(false);
    };

    const selectedLanguage = languages.find(lang => lang.code === language) || languages[0];

    return (
        <header className="flex items-center justify-between px-6 py-3 bg-gray-900 text-white shadow-md">
            <button onClick={() => setPage("home")} className="text-2xl cursor-pointer font-semibold text-white">Quantum Grid</button>

            <nav>
                <ul className="flex space-x-6">
                    <li>
                        <button
                            onClick={() => setPage("create")}
                            className="flex cursor-pointer items-center gap-2 px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-700 transition"
                        >
                            <PlusCircle size={20} />
                            {translations.createServer}
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setPage("connect")}
                            className="flex cursor-pointer items-center gap-2 px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-700 transition" >
                            <Network size={20} />
                            {translations.connectServer}
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setPage("specs")}
                            className="flex cursor-pointer items-center gap-2 px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-700 transition" >
                            <Cpu size={20} />
                            {translations.computerSpecs}
                        </button>
                    </li>
                </ul>
            </nav>

            <div className="relative">
                <button
                    aria-label="Select language"
                    onClick={toggleDropdown}
                    className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition"
                >
                    <span>{selectedLanguage.name}</span>
                    <ChevronDown size={16} />
                </button>

                {isDropdownOpen && (
                    <ul className="absolute right-0 mt-2 py-1 w-48 bg-gray-800 border border-gray-600 rounded shadow-lg z-50">
                        {languages.map((language) => (
                            <li
                                key={language.code}
                                onClick={() => handleLanguageSelect(language)}
                                className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-700 transition"
                            >
                                {language.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </header>
    );
}

export default Header;
