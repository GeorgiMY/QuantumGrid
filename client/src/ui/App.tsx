// App.tsx
import Header from '@/components/Header';
import './App.css'
import { useState } from 'react';
import CreateServer from './CreateServer';
import ConnectServer from './ConnectServer';
import ComputerSpecs from './ComputerSpecs';
import { LanguageProvider } from './LanguageContext';
import Home from './Home';

function App() {
    const [currentPage, setCurrentPage] = useState("home");

    return (
        <LanguageProvider>
            <main>
                <Header setPage={setCurrentPage} />
                <div className="main-content">
                    {currentPage === "home" && <Home />}
                    {currentPage === "create" && <CreateServer />}
                    {currentPage === "connect" && <ConnectServer />}
                    {currentPage === "specs" && <ComputerSpecs />}
                </div>
            </main>
        </LanguageProvider>
    );
}

export default App;
