import { useState } from "react";
import { useLanguage } from "./LanguageContext"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";

interface ConfigData {
    "volunteer-project": boolean;
    "type-of-data-distribution": string;
    "type-of-data-distributed": string;
    "local-json-path": string;
    "mongodb-collection-name": string;
    "type-of-data-deposition": string;
    "server-name": string;
    "server-description": string;
    "batch-size": string;
    "whitelist": string;
    "blacklist": string;
}

interface EnvData {
    "MONGODB_URI": string;
}

export function ConnectServer() {
    const [startedConfiguring, setStartedConfiguring] = useState<boolean>(false)
    const [pathToServer, setPathToServer] = useState<string>()
    const [configData, setConfigData] = useState<ConfigData | null>(null);
    const [envData, setEnvData] = useState<EnvData | null>();
    const [showSaveAlert, setShowSaveAlert] = useState(false);

    const { translations } = useLanguage();

    const labelMapping: Record<keyof ConfigData, string> = {
        "volunteer-project": translations.volunteerProject,
        "type-of-data-distribution": translations.typeOfDataDistribution,
        "type-of-data-distributed": translations.typeOfDataDistributed,
        "local-json-path": translations.localJsonPath,
        "mongodb-collection-name": translations.mongodbCollectionName,
        "type-of-data-deposition": translations.typeOfDataDeposition,
        "server-name": translations.serverName,
        "server-description": translations.serverDescription,
        "batch-size": translations.batchSize,
        "whitelist": translations.whitelist,
        "blacklist": translations.blacklist,
    };

    const handleChange = (key: keyof ConfigData, value: string | boolean) => {
        if (configData) {
            setConfigData({ ...configData, [key]: value });
        }
    };

    async function handleGitHubReleases() {
        await window.electron.openExternalLink("https://github.com/GeorgiMY/QuantumGrid/releases")
    }

    const handleSetupServer = async () => {
        try {
            const path = await window.electron.setupServer();
            if (!path) return;

            setPathToServer(path);

            // Get server-config file
            const serverConfig = await window.electron.getServerConfig(path);
            console.log(serverConfig);
            setConfigData(serverConfig);

            // Get env file
            const envFile = await window.electron.getEnvFile(path);
            setEnvData(envFile);
        } catch (error) {
            console.error("Error in handleSetupServer: ", error);
        }
    }

    const handleSave = async () => {
        if (!configData) {
            setShowSaveAlert(true);
            return;
        }

        const confirmSave = window.confirm(translations.confirmSave);

        if (!confirmSave) return;

        try {
            if (!pathToServer) {
                throw new Error("File path is undefined. Cannot save the file.");
            }
            await window.electron.saveJSON(configData, `${pathToServer}/server-config.json`);
            await window.electron.saveENVFile(envData, `${pathToServer}/.env`);
            alert("File saved successfully!");
        } catch (error) {
            console.error("Error saving file:", error);
            alert("Error saving file. Please try again.");
        }
    };

    const startServerConfiguring = () => {
        if (pathToServer) setStartedConfiguring(true);
        else alert("Choose a valid location of a Quantum Grid server first");
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4" >
            {startedConfiguring ? (
                <div>
                    <Card className="w-full max-w-3xl">
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold text-center" >{translations.createProject}</CardTitle>
                            <CardDescription className="text-xl mt-2" >{translations.createServerDesc}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {showSaveAlert && (
                                <Alert variant="destructive" className="mb-4" >
                                    {translations.chooseFileBeforeSave}
                                    <Button onClick={handleSetupServer}> Server Location</Button>
                                </Alert>
                            )}
                            {configData && (
                                <div className="space-y-4 mt-4">
                                    {Object.entries(configData).map(([key, value]) => (
                                        <div key={key} className="flex items-center space-x-2">
                                            <label className="text-xl font-medium w-1/2">{labelMapping[key as keyof ConfigData]}:</label>
                                            {key === "volunteer-project" ? (
                                                <input
                                                    type="checkbox"
                                                    checked={value as boolean}
                                                    onChange={(e) => handleChange(key as keyof ConfigData, e.target.checked)}
                                                    className="w-1/2" />
                                            ) : key === "type-of-data-distribution" ? (
                                                <Select
                                                    value={value as string}
                                                    onValueChange={(val) => handleChange(key as keyof ConfigData, val)} >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select an option" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem className="text-2xl" value="equally-distributed">Equally-Distributed</SelectItem>
                                                        <SelectItem className="text-2xl" value="cpu-intensive">CPU-Intensive</SelectItem>
                                                        <SelectItem className="text-2xl" value="gpu-intensive">GPU-Intensive</SelectItem>
                                                        <SelectItem className="text-2xl" value="memory-intensive">Memory-Intensive</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            ) : key === "type-of-data-distributed" ? (
                                                <Select
                                                    value={value as string}
                                                    onValueChange={(val) => handleChange(key as keyof ConfigData, val)} >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select an option" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem className="text-2xl" value="mongodb">MongoDB</SelectItem>
                                                        <SelectItem className="text-2xl" value="local-json">Local-JSON</SelectItem>
                                                        <SelectItem className="text-2xl" value="local-files">Local-Files</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            ) : key === "type-of-data-deposition" ? (
                                                <Select
                                                    value={value as string}
                                                    onValueChange={(val) => handleChange(key as keyof ConfigData, val)} >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select an option" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem className="text-2xl" value="mongodb">MongoDB</SelectItem>
                                                        {/* <SelectItem value="sample-option-2">Sample Option 2</SelectItem>
                                                        <SelectItem value="sample-option-3">Sample Option 3</SelectItem> */}
                                                    </SelectContent>
                                                </Select>
                                            ) : key === "whitelist" ? (
                                                <input
                                                    type="checkbox"
                                                    checked={value as boolean}
                                                    onChange={(e) => handleChange(key as keyof ConfigData, e.target.checked)}
                                                    className="w-1/2" />
                                            ) : key === "blacklist" ? (
                                                <input
                                                    type="checkbox"
                                                    checked={value as boolean}
                                                    onChange={(e) => handleChange(key as keyof ConfigData, e.target.checked)}
                                                    className="w-1/2" />
                                            ) : (
                                                <Input
                                                    value={value}
                                                    onChange={(e) => handleChange(key as keyof ConfigData, e.target.value)}
                                                    className="text-2xl p-3 w-1/2" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {envData && configData && configData["type-of-data-distributed"] === "mongodb" && (
                                <div className="mt-4">
                                    <label className="text-xl font-medium w-1/2">MONGODB_URI:</label>
                                    <Input
                                        value={envData.MONGODB_URI}
                                        onChange={(e) => setEnvData({ ...envData, MONGODB_URI: e.target.value })}
                                        className="text-l p-3" />
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
            ) : (
                <Card>
                    <CardContent>
                        <ul className="text-4xl items-center pt-4">
                            <li className="mb-4">
                                <button onClick={handleGitHubReleases} className="cursor-pointer" >
                                    1. {translations.downloadServerHere}: GitHub Releases
                                </button>
                            </li>
                            <li className="mb-4">
                                2. {translations.unzipServer}
                            </li>
                            <li className="mb-4" >
                                3. {translations.chooseWhereServerSaved} <Button onClick={handleSetupServer} className="cursor-pointer text-4xl p-8 mb-4"> {translations.placementOfServer}</Button>
                                <p className="mb-8">{translations.chosenPath}: <code className="font-bold italic bg-gray-300 rounded-xl p-2">{pathToServer}</code></p>
                            </li>
                            <li className="mb-4" >
                                <Button onClick={startServerConfiguring} className="cursor-pointer text-4xl p-8" >{translations.serverConfigure}</Button>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default ConnectServer

