type Specs = {
    osType: string;
    cpu: {
        model: string;
        speed: string; // e.g., "3200 MHz"
        cores: number;
    };
    ram: {
        total: string; // e.g., "16 GB"
        free: string; // e.g., "8 GB"
    };
    disks: {
        mount: string;
        type: string;
        total: string; // e.g., "512 GB"
        free: string; // e.g., "256 GB"
    }[];
    gpu: {
        model: string;
        vendor: string;
        memory: string; // e.g., "4096 MB" or "N/A"
        cores?: number; // Some GPUs may not expose core count
    }[];
    ipAddress: string;
    localTime: string; // e.g., "2024-02-13 15:30:00"
}

type Translation = {
    createServer: string;
    connectServer: string;
    createServerTitle: string;
    createServerDesc: string;
    connectServerTitle: string;
    connectServerDesc: string;
    createProject: string;
    projectName: string;
    projectNamePlaceholder: string;
    projectDescription: string;
    projectDescPlaceholder: string;
    optionalDataUpload: string;
    optionalDataHint: string;
    distributionFormula: string;
    cpuIntensive: string;
    gpuIntensive: string;
    memoryIntensive: string;
    equalDistribution: string;
    customDistribution: string;
    termsAgree: string;
    termsLink: string;
    privacyAgree: string;
    privacyLink: string;
    dataConsent: string;
    createProjectButton: string;
    connectingToServer: string;
    disconnectFromServer: string;
    statusFailedConnecting: string;
    statusJustConnected: string;
    statusAlreadyConnected: string;
    connectedStatus: string;
    enterServerURL: string;
    mongoDB: string;
    jsonLocal: string;
    localFiles: string;
    title: string;
    homeDescription: string;
    serverEditor: string;
    editServerConf: string;
    saveFile: string;
    chooseFileBeforeSave: string;
    confirmSave: string;
    volunteerProject: string;
    typeOfDataDistribution: string;
    typeOfDataDistributed: string;
    localJsonPath: string;
    mongodbCollectionName: string;
    typeOfDataDeposition: string;
    chooseFile: string;
    commingSoon: string;
}

type UnsubscribeFunction = () => void;

type EventPayloadMapping = {

}

interface Window {
    electron: {
        saveJSON,
        openDialog,
        responseOpenDialog,
        startWebsocketConnection,
        disconnectFromServer,
        setupServer
    }
}
