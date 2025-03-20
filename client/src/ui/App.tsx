// App.tsx
import Header from '@/components/Header';
import './App.css'
import { useState } from 'react';
import ConnectServer from './ConnectServer';
// import ComputerSpecs from './ComputerSpecs';
import { LanguageProvider } from './LanguageContext';
import Home from './Home';
import ConfigureServer from './ConfigureServer';
import Settings from './Settings';

function App() {
    const [currentPage, setCurrentPage] = useState("home");

    return (
        <LanguageProvider>
            <main>
                <Header setPage={setCurrentPage} />
                <div className="main-content">
                    {currentPage === "home" && <Home />}
                    {currentPage === "connect" && <ConnectServer />}
                    {/* {currentPage === "specs" && <ComputerSpecs />} */}
                    {currentPage === "configureServer" && <ConfigureServer />}
                    {currentPage === "settings" && <Settings />}
                </div>
            </main>
        </LanguageProvider>
    );
}

export default App;
