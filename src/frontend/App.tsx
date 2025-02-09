import { useState } from "react";
import Header from "./Components/Header";
import { MainContext, mainContextType } from "./mainContext/MainContext";
import SideBar from "./Components/SideBar";
import HomePage from "./pages/HomePage";

function App() {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [fullView, setFullView] = useState(false);
    const [currentDoc, setCurrentDoc] = useState(0);

    const context: mainContextType = {
        isOpenMenu,
        setIsOpenMenu,
        fullView,
        setFullView,
        currentDoc,
        setCurrentDoc,
    };

    return (
        <MainContext.Provider value={context}>
            <div className="h-screen max-h-screen md:overflow-hidden flex w-full text-white font-commissioner">
                <SideBar />
                <div className={`flex-1 flex flex-col transition-all duration-300 ${isOpenMenu ? "ml-[250px]" : "ml-0"}`}>
                    <Header />
                    <div className="flex-1 overflow-hidden">
                        <HomePage />
                    </div>
                </div>
            </div>
        </MainContext.Provider>
    );
}

export default App;
