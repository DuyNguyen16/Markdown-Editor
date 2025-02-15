/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Header from "./Components/Header";
import { MainContext, mainContextType } from "./mainContext/MainContext";
import SideBar from "./Components/SideBar";
import EditPage from "./pages/EditPage";
import { db } from "../backend/firebase";
import { collection, getDocs } from "firebase/firestore";

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
            <div className="bg-DBG h-screen max-h-screen flex flex-col w-full text-white font-commissioner overflow-hidden">
                <SideBar />
                <div
                    className={`w-full h-full transition-all duration-300 ${
                        isOpenMenu ? "md:ml-[250px] overflow-hidden" : "ml-0"
                    }`}
                >
                    <Header />
                    <EditPage />
                </div>
            </div>
        </MainContext.Provider>
    );
}

export default App;
