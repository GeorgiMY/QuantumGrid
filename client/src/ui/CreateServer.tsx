import { useState } from "react";
import { useLanguage } from './LanguageContext';

interface FormData {
    projectName: string;
    projectDescription: string;
    dataType: "images" | "json" | "video" | "text";
    optionalData: File | null;
    distributionFormula: "cpu-heavy" | "gpu-heavy" | "balanced" | "custom";
    terms: boolean;
    privacy: boolean;
    dataSharing: boolean;
}

const initialFormData: FormData = {
    projectName: "",
    projectDescription: "",
    dataType: "images",
    optionalData: null,
    distributionFormula: "cpu-heavy",
    terms: false,
    privacy: false,
    dataSharing: false,
};

const dataTypes = [
    { value: "images", translationKey: "dataTypeImages" },
    { value: "json", translationKey: "dataTypeJson" },
    { value: "video", translationKey: "dataTypeVideo" },
    { value: "text", translationKey: "dataTypeText" },
] as const;

const distributionOptions = [
    { value: "cpu-heavy", translationKey: "cpuHeavy" },
    { value: "gpu-heavy", translationKey: "gpuHeavy" },
    { value: "balanced", translationKey: "balanced" },
    { value: "custom", translationKey: "custom" },
] as const;

function CreateServer() {
    const { translations } = useLanguage();
    const [formData, setFormData] = useState<FormData>(initialFormData);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({ ...prev, optionalData: file }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log("Form Data Submitted:", formData);
            // Add your form submission logic here
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">
                {translations.createProject}
            </h1>

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
                {/* Project Name */}
                <div>
                    <label htmlFor="project-name" className="block text-lg font-semibold mb-2">
                        {translations.projectName}
                    </label>
                    <input
                        type="text"
                        id="project-name"
                        name="projectName"
                        placeholder={translations.projectNamePlaceholder}
                        value={formData.projectName}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                </div>

                {/* Project Description */}
                <div>
                    <label htmlFor="project-description" className="block text-lg font-semibold mb-2">
                        {translations.projectDescription}
                    </label>
                    <textarea
                        id="project-description"
                        name="projectDescription"
                        placeholder={translations.projectDescPlaceholder}
                        value={formData.projectDescription}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>

                {/* Data Type */}
                <div>
                    <label className="block text-lg font-semibold mb-2">
                        {translations.dataTypeLabel}
                    </label>
                    <div className="space-y-2">
                        {dataTypes.map(({ value, translationKey }) => (
                            <label key={value} className="flex items-center">
                                <input
                                    type="radio"
                                    name="dataType"
                                    value={value}
                                    checked={formData.dataType === value}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                {translations[translationKey]}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Optional Data Upload */}
                <div>
                    <label htmlFor="optional-data" className="block text-lg font-semibold mb-2">
                        {translations.optionalDataUpload}
                    </label>
                    <input
                        type="file"
                        id="optional-data"
                        name="optionalData"
                        onChange={handleFileChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <p className="text-sm text-gray-600 mt-2">
                        {translations.optionalDataHint}
                    </p>
                </div>

                {/* Work Distribution Formula */}
                <div>
                    <label htmlFor="distribution-formula" className="block text-lg font-semibold mb-2">
                        {translations.distributionFormula}
                    </label>
                    <select
                        id="distribution-formula"
                        name="distributionFormula"
                        value={formData.distributionFormula}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        {distributionOptions.map(({ value, translationKey }) => (
                            <option key={value} value={value}>
                                {translations[translationKey]}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-2">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="terms"
                            checked={formData.terms}
                            onChange={handleInputChange}
                            className="mr-2"
                            required
                        />
                        <span>
                            {translations.termsAgree}{" "}
                            <a href="/tos" className="text-blue-500 underline">
                                {translations.termsLink}
                            </a>
                            .
                        </span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="privacy"
                            checked={formData.privacy}
                            onChange={handleInputChange}
                            className="mr-2"
                            required
                        />
                        <span>
                            {translations.privacyAgree}{" "}
                            <a href="/pp" className="text-blue-500 underline">
                                {translations.privacyLink}
                            </a>
                            .
                        </span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="dataSharing"
                            checked={formData.dataSharing}
                            onChange={handleInputChange}
                            className="mr-2"
                        />
                        {translations.dataConsent}
                    </label>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        {translations.createProjectButton}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateServer;
