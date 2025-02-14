function PrivacyPolicy() {
    return (
        <div className="bg-gray-100 text-gray-800 min-h-screen">
            <div className="container mx-auto p-6">
                {/* Title */}
                <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>

                {/* Content Container */}
                <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
                    {/* Section 1: Introduction */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
                        <p>
                            This Privacy Policy outlines the types of information Quantum Grid collects, how we use it, and the
                            measures we take to protect your data.
                        </p>
                    </section>

                    {/* Section 2: Information We Collect */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">2. Information We Collect</h2>
                        <p>We may collect the following types of information:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Personal Information: Such as your name, email address, and contact details.</li>
                            <li>
                                Usage Data: Information about how you interact with our platform, including pages visited, clicks, and
                                other behavioral data.
                            </li>
                            <li>
                                Technical Data: Your IP address, device information, operating system, and browser details.
                            </li>
                        </ul>
                    </section>

                    {/* Section 3: How We Use Your Information */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Information</h2>
                        <p>The information we collect is used to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Provide and improve our services.</li>
                            <li>Personalize your experience on the platform.</li>
                            <li>Communicate with you, including sending updates and notifications.</li>
                            <li>Analyze platform usage and performance.</li>
                            <li>Ensure security and prevent fraud.</li>
                        </ul>
                    </section>

                    {/* Section 4: Sharing Your Information */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">4. Sharing Your Information</h2>
                        <p>
                            We do not sell or rent your personal data. However, we may share your information with:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                Service Providers: Third-party vendors who assist with platform operations, such as hosting and
                                analytics.
                            </li>
                            <li>
                                Legal Authorities: When required to comply with legal obligations or protect our rights.
                            </li>
                        </ul>
                    </section>

                    {/* Section 5: Data Security */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">5. Data Security</h2>
                        <p>
                            We implement industry-standard security measures to protect your data from unauthorized access,
                            alteration, or disclosure. However, no method of transmission over the internet is entirely secure, and we
                            cannot guarantee absolute security.
                        </p>
                    </section>

                    {/* Section 6: Cookies */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">6. Cookies</h2>
                        <p>
                            Our platform uses cookies to enhance your experience. These small data files are stored on your device to
                            remember preferences and gather usage analytics. You can adjust your browser settings to disable cookies,
                            though some features may not function properly.
                        </p>
                    </section>

                    {/* Section 7: Your Rights */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">7. Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Access, update, or delete your personal information.</li>
                            <li>Withdraw consent for data processing.</li>
                            <li>Request a copy of the data we have collected about you.</li>
                        </ul>
                        <p>
                            To exercise your rights, please contact us at{" "}
                            <a
                                href="mailto:support@yourproject.com"
                                className="text-blue-500 underline"
                            >
                                support@yourproject.com
                            </a>
                            .
                        </p>
                    </section>

                    {/* Section 8: Changes to This Policy */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">8. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we
                            encourage you to review it periodically.
                        </p>
                    </section>

                    {/* Section 9: Contact Us */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">9. Contact Us</h2>
                        <p>
                            If you have any questions or concerns about this Privacy Policy, please contact us at{" "}
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

export default PrivacyPolicy;
