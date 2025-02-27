import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { useLanguage } from './LanguageContext';
import { saveJSONToFile } from "../electron/fileOperations"

interface ConfigData {
    "volunteer-project": boolean;
    "type-of-data-distribution": string;
    "type-of-data-distributed": string;
    "local-json-path": string;
    "mongodb-collection-name": string;
    "type-of-data-deposition": string;
}

const ServerEditor: React.FC = () => {
    const [configData, setConfigData] = useState<ConfigData | null>(null);
    const [filePath, setFilePath] = useState<string>('');
    const { translations } = useLanguage();
    const [showAlert, setShowAlert] = useState(false);

    // Mapping for user-friendly names
    const labelMapping: Record<keyof ConfigData, string> = {
        "volunteer-project": translations.volunteerProject,
        "type-of-data-distribution": translations.typeOfDataDistribution,
        "type-of-data-distributed": translations.typeOfDataDistributed,
        "local-json-path": translations.localJsonPath,
        "mongodb-collection-name": translations.mongodbCollectionName,
        "type-of-data-deposition": translations.typeOfDataDeposition,
    };

    function handleFileChange() {
        window.electron.openDialog();
    }

    window.electron.responseOpenDialog((response: { path: string; data: ConfigData }) => {
        setFilePath(response.path);
        console.log("Received Path:", response.path);
        console.log("Received Data:", response.data);
        setConfigData(response.data);
    });

    const handleChange = (key: keyof ConfigData, value: string | boolean) => {
        if (configData) {
            setConfigData({ ...configData, [key]: value });
        }
    };

    const handleSave = async () => {
        if (!configData) {
            setShowAlert(true);
            return;
        }

        const confirmSave = window.confirm(translations.confirmSave);

        if (confirmSave) {
            try {
                console.log("Saving to path:", filePath);
                if (!filePath) {
                    throw new Error("File path is undefined. Cannot save the file.");
                }
                await window.electron.saveJSON(configData, filePath);
                alert("File saved successfully!");
            } catch (error) {
                console.error("Error saving file:", error);
                alert("Error saving file. Please try again.");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <Card className="w-full max-w-3xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">{translations.editServerConf}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button onClick={handleFileChange} className="mb-4 cursor-pointer" >{translations.chooseFile}</Button>
                    {showAlert && (
                        <Alert variant="destructive" className="mb-4" >
                            {translations.chooseFileBeforeSave}
                        </Alert>
                    )}
                    {configData && (
                        <div className="space-y-4 mt-4">
                            {Object.entries(configData).map(([key, value]) => (
                                <div key={key} className="flex items-center space-x-2">
                                    <label className="text-sm font-medium w-1/2">{labelMapping[key as keyof ConfigData]}:</label>
                                    {key === "volunteer-project" ? (
                                        <input
                                            type="checkbox"
                                            checked={value as boolean}
                                            onChange={(e) => handleChange(key as keyof ConfigData, e.target.checked)}
                                            className="w-1/2"
                                        />
                                    ) : key === "type-of-data-distribution" ? (
                                        <Select
                                            value={value as string}
                                            onValueChange={(val) => handleChange(key as keyof ConfigData, val)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an option" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="equally-distributed">Equally-Distributed</SelectItem>
                                                <SelectItem value="cpu-intensive">CPU-Intensive</SelectItem>
                                                <SelectItem value="gpu-intensive">GPU-Intensive</SelectItem>
                                                <SelectItem value="memory-intensive">Memory-Intensive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    ) : key === "type-of-data-distributed" ? (
                                        <Select
                                            value={value as string}
                                            onValueChange={(val) => handleChange(key as keyof ConfigData, val)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an option" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="mongodb">MongoDB</SelectItem>
                                                <SelectItem value="local-json">Local-JSON</SelectItem>
                                                <SelectItem value="local-files">Local-Files</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    ) : key === "type-of-data-deposition" ? (
                                        <Select
                                            value={value as string}
                                            onValueChange={(val) => handleChange(key as keyof ConfigData, val)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an option" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="mongodb">MongoDB</SelectItem>
                                                <SelectItem value="sample-option-2">Sample Option 2</SelectItem>
                                                <SelectItem value="sample-option-3">Sample Option 3</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <Input
                                            value={value}
                                            onChange={(e) => handleChange(key as keyof ConfigData, e.target.value)}
                                            className="text-base p-3 w-1/2"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSave} className="w-full text-base py-5">
                        {translations.saveFile}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ServerEditor; 
