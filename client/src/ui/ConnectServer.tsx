import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle2, XCircle } from "lucide-react"
import { useLanguage } from "./LanguageContext"

export function ConnectServer() {
    const [connectionStatus, setConnectionStatus] = useState<string | null>(null)
    const [isConnected, setIsConnected] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [serverURL, setServerURL] = useState("localhost:3000")
    const { translations } = useLanguage();

    const handleConnect = async () => {
        if (isConnected) {
            setConnectionStatus(translations.statusAlreadyConnected)
            return
        }

        setIsLoading(true)
        try {
            window.electron.startWebsocketConnection(serverURL);
            setIsConnected(true)
            setConnectionStatus(translations.statusJustConnected)
        } catch (error) {
            console.error("Connection error:", error)
            setIsConnected(false)
            setConnectionStatus(translations.statusFailedConnecting)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDisconnect = () => {
        window.electron.disconnectFromServer();
        setIsConnected(false)
        setConnectionStatus(translations.disconnectFromServer)
    }

    useEffect(() => {
        const checkConnection = async () => {
            const result = await window.electron.isConnectedToWS();
            if (result) setIsConnected(true);
            else setIsConnected(false);
        };

        checkConnection();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">{translations.connectServerTitle}</CardTitle>
                    <CardDescription className="text-lg">{translations.connectServerDesc}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <Input
                            id="connectURL"
                            type="text"
                            placeholder={translations.enterServerURL}
                            value={serverURL}
                            onChange={(e) => setServerURL(e.target.value)}
                            className="text-lg p-6" />
                        <div className="flex justify-center">
                            {!isConnected && (
                                <Button onClick={handleConnect} disabled={isLoading} className="w-full text-lg py-6">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                                            {translations.connectingToServer}
                                        </>
                                    ) : (
                                        translations.connectServerTitle
                                    )}
                                </Button>
                            )}
                            {isConnected && (
                                <div className="w-full">
                                    <Button onClick={handleDisconnect} variant="destructive" className="w-full text-lg py-6">
                                        {translations.disconnectFromServer}
                                    </Button>
                                    {/* <p>Download the software for handling this data: {serverURL}/download</p> */}
                                    <p>Изтеглете софтуер за преработване на тези данни от: {serverURL}/download</p>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    {connectionStatus && (
                        <Alert
                            variant={isConnected ? "default" : connectionStatus.includes("Failed") ? "destructive" : "default"}
                            className="w-full text-lg" >
                            {isConnected ? (
                                <CheckCircle2 className="h-6 w-6" />
                            ) : connectionStatus.includes("Failed") ? (
                                <XCircle className="h-6 w-6" />
                            ) : (
                                <AlertCircle className="h-6 w-6" />
                            )}
                            <AlertTitle className="text-xl">{translations.connectedStatus}</AlertTitle>
                            <AlertDescription className="text-lg">{connectionStatus}</AlertDescription>
                        </Alert>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}

export default ConnectServer

