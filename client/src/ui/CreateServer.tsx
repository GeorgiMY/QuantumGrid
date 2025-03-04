import type React from "react"
import { useState } from "react"
import { useLanguage } from "./LanguageContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

interface FormData {
    projectName: string
    projectDescription: string
    dataType: "MongoDB" | "Local-JSON" | "Local-Files"
    optionalData: File | null
    distributionFormula: "Equally-Distributed" | "CPU-Intensive" | "GPU-intensive" | "Memory-Intensive" | "Custom"
    terms: boolean
    privacy: boolean
    dataSharing: boolean
}

const initialFormData: FormData = {
    projectName: "",
    projectDescription: "",
    dataType: "MongoDB",
    optionalData: null,
    distributionFormula: "CPU-Intensive",
    terms: false,
    privacy: false,
    dataSharing: false,
}

const dataTypes = [
    { value: "MongoDB", translationKey: "mongoDB" },
    { value: "Local-JSON", translationKey: "jsonLocal" },
    { value: "Local-Files", translationKey: "localFiles" },
] as const

const distributionOptions = [
    { value: "CPU-Intensive", translationKey: "cpuIntensive" },
    { value: "GPU-intensive", translationKey: "gpuIntensive" },
    { value: "Equally-Distributed", translationKey: "equalDistribution" },
    { value: "Memory-Intensive", translationKey: "memoryIntensive" },
    { value: "Custom", translationKey: "customDistribution" },
] as const

export function CreateServer() {
    const { translations } = useLanguage()
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const [pathToServer, setPathToServer] = useState<string>("/")
    const [startedConfiguring, setStartedConfiguring] = useState<boolean>(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        setFormData((prev) => ({ ...prev, optionalData: file }))
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const file = e.dataTransfer.files?.[0] || null
        if (file) {
            setFormData((prev) => ({ ...prev, optionalData: file }))
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            console.log("Form Data Submitted:", formData)

        } catch (error) {
            console.error("Error submitting form:", error)
        }
    }

    const handleSetupServer = async () => {
        try {
            const path = await window.electron.setupServer();
            setPathToServer(path);
        } catch (error) {
            console.error("Error in handleSetupServer: ", error);
        }
    }

    const startServerConfiguring = () => {
        setStartedConfiguring(true)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            {startedConfiguring ? (
                <Card className="w-full max-w-3xl">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">{translations.createProject}</CardTitle>
                        <CardDescription className="text-base mt-2">{translations.createServerDesc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="project-name" className="text-sm font-medium">
                                    {translations.projectName}
                                </Label>
                                <Input
                                    id="project-name"
                                    name="projectName"
                                    placeholder={translations.projectNamePlaceholder}
                                    value={formData.projectName}
                                    onChange={handleInputChange}
                                    className="text-base p-3"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="project-description" className="text-sm font-medium">
                                    {translations.projectDescription}
                                </Label>
                                <Textarea
                                    id="project-description"
                                    name="projectDescription"
                                    placeholder={translations.projectDescPlaceholder}
                                    value={formData.projectDescription}
                                    onChange={handleInputChange}
                                    className="text-base p-3"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="data-type" className="text-sm font-medium">
                                    {/* {translations.dataTypeLabel} */}
                                </Label>
                                <Select
                                    name="dataType"
                                    value={formData.dataType}
                                    onValueChange={(value) => setFormData((prev) => ({ ...prev, dataType: value as FormData["dataType"] }))} >
                                    <SelectTrigger id="data-type" className="text-base p-3">
                                        <SelectValue placeholder="Select data type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {dataTypes.map(({ value, translationKey }) => (
                                            <SelectItem key={value} value={value}>
                                                {translationKey === "mongoDB" ? (
                                                    translations[translationKey]
                                                ) : (
                                                    translations[translationKey] + " (" + translations.commingSoon + ")"
                                                )}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {formData.dataType === "MongoDB" ? (
                                <div className="space-y-2">
                                    <Label htmlFor="mongo-uri" className="text-sm font-medium">
                                        MongoDB URI
                                    </Label>
                                    <Input
                                        id="mongo-uri"
                                        name="mongoURI"
                                        placeholder="Enter MongoDB URI"
                                        onChange={handleInputChange}
                                        className="text-base p-3"
                                    />
                                </div>
                            ) : formData.dataType == "Local-Files" ? (
                                <div className="space-y-2">
                                    <Label htmlFor="optional-data" className="text-sm font-medium">
                                        {translations.optionalDataUpload}
                                    </Label>
                                    <Input
                                        id="optional-data"
                                        name="optionalData"
                                        type="file"
                                        onChange={handleFileChange}
                                        className="text-base" />
                                    <p className="text-xs text-muted-foreground mt-1">{translations.optionalDataHint}</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Label htmlFor="optional-data" className="text-sm font-medium">
                                        {translations.optionalDataUpload}
                                    </Label>
                                    <Input
                                        id="optional-data"
                                        name="optionalData"
                                        type="file"
                                        onChange={handleFileChange}
                                        className="text-base" />
                                    <p className="text-xs text-muted-foreground mt-1">{translations.optionalDataHint}</p>
                                </div>
                            )}


                            <div className="space-y-2">
                                <Label htmlFor="distribution-formula" className="text-sm font-medium">
                                    {translations.distributionFormula}
                                </Label>
                                <Select
                                    name="distributionFormula"
                                    value={formData.distributionFormula}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({ ...prev, distributionFormula: value as FormData["distributionFormula"] }))
                                    }
                                >
                                    <SelectTrigger id="distribution-formula" className="text-base p-3">
                                        <SelectValue placeholder="Select distribution formula" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {distributionOptions.map(({ value, translationKey }) => (
                                            <SelectItem key={value} value={value}>
                                                {translationKey === "equalDistribution" ? (
                                                    translations[translationKey]
                                                ) : (
                                                    translations[translationKey] + " (" + translations.commingSoon + ")"
                                                )}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="terms"
                                        name="terms"
                                        checked={formData.terms}
                                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, terms: checked as boolean }))}
                                    />
                                    <Label htmlFor="terms" className="text-sm leading-none">
                                        {translations.termsAgree}{" "}
                                        <a href="/tos" className="text-blue-500 underline">
                                            {translations.termsLink}
                                        </a>
                                        .
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="privacy"
                                        name="privacy"
                                        checked={formData.privacy}
                                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, privacy: checked as boolean }))}
                                    />
                                    <Label htmlFor="privacy" className="text-sm leading-none">
                                        {translations.privacyAgree}{" "}
                                        <a href="/pp" className="text-blue-500 underline">
                                            {translations.privacyLink}
                                        </a>
                                        .
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="dataSharing"
                                        name="dataSharing"
                                        checked={formData.dataSharing}
                                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, dataSharing: checked as boolean }))}
                                    />
                                    <Label htmlFor="dataSharing" className="text-sm leading-none">
                                        {translations.dataConsent}
                                    </Label>
                                </div>
                            </div>
                            <div
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                className="border-2 border-dashed p-6 flex justify-center items-center cursor-pointer hover:bg-gray-50" >
                                <input
                                    id="optional-data"
                                    name="optionalData"
                                    type="file"
                                    onChange={handleFileChange}
                                    className="hidden" />

                                <span className="text-sm text-gray-500 cursor-pointer">
                                    {/* {translations.dragAndDropText} */}
                                    Добави софтуерен файл
                                    {/* <Button type="button" className="inline-block text-blue-500">
                                            {translations.clickToAddFile}
                                        </Button> */}
                                </span>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full text-base py-5 cursor-pointer">
                            {translations.createProjectButton}
                        </Button>
                    </CardFooter>
                </Card>
            ) : (
                <ul>
                    <li>
                        1. Download server from here:
                        <a href="https://github.com/GeorgiMY/QuantumGrid/releases" >GitHub Releases</a>
                    </li>
                    <li>
                        2. Choose where you've saved the server to set it up: <Button onClick={handleSetupServer}>Server Location</Button>
                        <p>Chosen path: {pathToServer}</p>
                    </li>
                    <li>
                        <Button onClick={startServerConfiguring}>Configure Server</Button>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default CreateServer

