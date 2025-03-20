import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type clientConfigType = {
    "data-received": string;
    "data-for-depositing": string;
}

export function Settings() {
    const [clientConfig, setClientConfig] = useState<clientConfigType>()

    const { translations } = useLanguage();

    const labelMapping: Record<keyof clientConfigType, string> = {
        "data-received": "Receive Data Here",
        "data-for-depositing": "Send Data Here"
    };

    const handleChange = (key: keyof clientConfigType, value: string | boolean) => {
        if (clientConfig) setClientConfig({ ...clientConfig, [key]: value });
    };

    useEffect(() => {
        const getCurrentClientConfig = async () => {
            const fetchedClientConfig = await window.electron.fetchClientConfig();

            setClientConfig(fetchedClientConfig);
        };

        getCurrentClientConfig();
    }, [])

    const handleSave = async () => {
        const confirmSave = window.confirm(translations.confirmSave);

        if (!confirmSave) return;

        try {
            await window.electron.saveClientConfig(clientConfig, "./client-config.json");
            alert("File saved successfully!");
        } catch (error) {
            console.error("Error saving file: ", error);
            alert("Error saving file. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4" >
            <Card className="w-full max-w-3xl" >
                <CardHeader>
                    <CardTitle className="text-4xl font-bold text-center" >Settings Menu</CardTitle>
                    <CardDescription className="text-xl mt-2" >Here you can edit your settings</CardDescription>
                </CardHeader>
                <CardContent>
                    {clientConfig && (
                        <div className="space-y-4 mt-4">
                            {Object.entries(clientConfig).map(([key, value]) => (
                                <div key={key} className="flex items-center space-x-2">
                                    <label className="text-xl font-medium w-1/2">{labelMapping[key as keyof clientConfigType]}:</label>
                                    <Input
                                        value={value}
                                        onChange={(e) => handleChange(key as keyof clientConfigType, e.target.value)}
                                        className="text-2xl p-3 w-1/2" />
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSave} className="w-full text-base py-5" >
                        Save Settings
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Settings
