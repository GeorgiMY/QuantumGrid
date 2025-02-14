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
    dataTypeLabel: string;
    dataTypeImages: string;
    dataTypeJson: string;
    dataTypeVideo: string;
    dataTypeText: string;
    optionalDataUpload: string;
    optionalDataHint: string;
    distributionFormula: string;
    cpuHeavy: string;
    gpuHeavy: string;
    balanced: string;
    custom: string;
    termsAgree: string;
    termsLink: string;
    privacyAgree: string;
    privacyLink: string;
    dataConsent: string;
    createProjectButton: string;
}

type UnsubscribeFunction = () => void;

type EventPayloadMapping = {
}

interface Window {
    electron: {

    }
}
