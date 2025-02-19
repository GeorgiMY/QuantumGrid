import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle2, XCircle } from "lucide-react"
import { connectToServerUsingWS, disconnectFromServer } from "../electron/functions"

export function ConnectServer() {
    const [connectionStatus, setConnectionStatus] = useState<string | null>(null)
    const [isConnected, setIsConnected] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [serverURL, setServerURL] = useState("localhost:3000/work/distribute")

    const handleConnect = async () => {
        if (isConnected) {
            setConnectionStatus("Already connected to the server.")
            return
        }

        setIsLoading(true)
        try {
            await connectToServerUsingWS(`ws://${serverURL}`)
            setIsConnected(true)
            setConnectionStatus("Connected to the server!")
        } catch (error) {
            console.error("Connection error:", error)
            setConnectionStatus("Failed to connect to the server.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleDisconnect = () => {
        disconnectFromServer()
        setIsConnected(false)
        setConnectionStatus("Disconnected from the server.")
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Connect to Server</CardTitle>
                    <CardDescription className="text-lg">Join existing volunteer computing projects.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <Input
                            id="connectURL"
                            type="text"
                            placeholder="Enter server URL"
                            value={serverURL}
                            onChange={(e) => setServerURL(e.target.value)}
                            className="text-lg p-6"
                        />
                        <div className="flex justify-center">
                            {!isConnected && (
                                <Button onClick={handleConnect} disabled={isLoading} className="w-full text-lg py-6">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                                            Connecting
                                        </>
                                    ) : (
                                        "Connect to Server"
                                    )}
                                </Button>
                            )}
                            {isConnected && (
                                <Button onClick={handleDisconnect} variant="destructive" className="w-full text-lg py-6">
                                    Disconnect from Server
                                </Button>
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    {connectionStatus && (
                        <Alert
                            variant={isConnected ? "default" : connectionStatus.includes("Failed") ? "destructive" : "default"}
                            className="w-full text-lg"
                        >
                            {isConnected ? (
                                <CheckCircle2 className="h-6 w-6" />
                            ) : connectionStatus.includes("Failed") ? (
                                <XCircle className="h-6 w-6" />
                            ) : (
                                <AlertCircle className="h-6 w-6" />
                            )}
                            <AlertTitle className="text-xl">Status</AlertTitle>
                            <AlertDescription className="text-lg">{connectionStatus}</AlertDescription>
                        </Alert>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}

export default ConnectServer

