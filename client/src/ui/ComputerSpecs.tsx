function ComputerSpecs() {
    return (
        <div className="tab-content">
            <h2 data-lang-key="specsTitle">Specifications</h2>
            <p data-lang-key="specsDesc">Here are your server specs</p>
            <div id="info" className="container mx-auto p-6">
                <pre>Loading system information...</pre>
            </div>
        </div>
    );
};

export default ComputerSpecs;
