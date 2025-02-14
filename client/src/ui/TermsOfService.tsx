function TermsAndConditions() {
    return (
        <div className="bg-gray-100 text-gray-800 min-h-screen">
            <div className="container mx-auto p-6">
                {/* Title */}
                <h1 className="text-4xl font-bold mb-6 text-center">Terms and Conditions</h1>

                {/* Content Container */}
                <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
                    {/* Section 1: Introduction */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
                        <p>
                            Welcome to Quantum Grid. By accessing or using our services, you agree to comply with and be bound by the
                            following terms and conditions. Please read them carefully before using the platform.
                        </p>
                    </section>

                    {/* Section 2: Acceptance of Terms */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">2. Acceptance of Terms</h2>
                        <p>
                            By creating a volunteer computing project or participating in one, you acknowledge that you have read,
                            understood, and agreed to these terms. If you do not agree, you may not use our services.
                        </p>
                    </section>

                    {/* Section 3: User Responsibilities */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">3. User Responsibilities</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Ensure all data you provide complies with applicable laws and regulations.</li>
                            <li>Do not upload malicious or harmful files to the platform.</li>
                            <li>Respect the privacy and intellectual property rights of others.</li>
                        </ul>
                    </section>

                    {/* Section 4: Data Usage */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">4. Data Usage</h2>
                        <p>
                            Any data shared on the platform may be distributed to participant machines for the purposes of the
                            project. We are not responsible for any misuse of data once distributed.
                        </p>
                        <p>
                            By using the platform, you consent to the processing and distribution of data as outlined in your project
                            settings.
                        </p>
                    </section>

                    {/* Section 5: Disclaimer of Warranties */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">5. Disclaimer of Warranties</h2>
                        <p>
                            The platform is provided "as is" without warranties of any kind. We do not guarantee uninterrupted
                            access, error-free operation, or that the platform will meet your specific requirements.
                        </p>
                    </section>

                    {/* Section 6: Limitation of Liability */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">6. Limitation of Liability</h2>
                        <p>
                            To the fullest extent permitted by law, we will not be liable for any indirect, incidental, or
                            consequential damages resulting from your use of the platform.
                        </p>
                    </section>

                    {/* Section 7: Modifications to Terms */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">7. Modifications to Terms</h2>
                        <p>
                            We reserve the right to update these terms at any time. Any changes will be communicated on the platform,
                            and continued use of the platform constitutes acceptance of the updated terms.
                        </p>
                    </section>

                    {/* Section 8: Termination */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">8. Termination</h2>
                        <p>
                            We may terminate or suspend your access to the platform at our discretion for any violation of these
                            terms or any illegal activity.
                        </p>
                    </section>

                    {/* Section 9: Governing Law */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">9. Governing Law</h2>
                        <p>
                            These terms are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any
                            disputes shall be resolved in the courts of [Your Jurisdiction].
                        </p>
                    </section>

                    {/* Section 10: Contact Information */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">10. Contact Information</h2>
                        <p>
                            If you have any questions or concerns about these terms, please contact us at{" "}
                            <a
                                href="mailto:support@yourproject.com"
                                className="text-blue-500 underline"
                            >
                                support@yourproject.com
                            </a>
                            .
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
