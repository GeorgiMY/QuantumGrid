import { useState } from "react";
import { connectToServerUsingWS } from '../electron/functions';

function ConnectServer() {
    const [connectionStatus, setConnectionStatus] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleConnect = async () => {
        if (isConnected) {
            setConnectionStatus("Already connected to the server.");
            return;
        }

        setIsLoading(true);
        try {
            await connectToServerUsingWS();
            setIsConnected(true);
            setConnectionStatus("Connected to the server!");
        } catch (error) {
            console.error("Connection error:", error);
            setConnectionStatus("Failed to connect to the server.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="tab-content">
            <h2 data-lang-key="connectServerTitle">Connect to Server</h2>
            <p data-lang-key="connectServerDesc">
                Join existing volunteer computing projects.
            </p>
            <input
                id="connectURL"
                type="text"
                placeholder="Enter server URL"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
                onClick={handleConnect}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 mt-4"
                disabled={isLoading}
            >
                {isLoading ? "Connecting..." : "Connect to Server"}
            </button>
            {connectionStatus && <p>{connectionStatus}</p>}
        </div>
    );
}

export default ConnectServer;
