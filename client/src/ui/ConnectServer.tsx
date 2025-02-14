function ConnectServer() {
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
                id="getInfo"
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 mt-4"
            >
                Submit!
            </button>
        </div>
    );
};

export default ConnectServer;
