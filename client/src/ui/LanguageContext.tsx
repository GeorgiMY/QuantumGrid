// LanguageContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import translationsJson from "../translations.json" with { type: "json" };

export type LanguageCode = keyof typeof translationsJson;

interface LanguageContextType {
    language: LanguageCode;
    setLanguage: (code: LanguageCode) => void;
    translations: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<LanguageCode>('en');

    const value = {
        language,
        setLanguage,
        translations: translationsJson[language] as Translation
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
