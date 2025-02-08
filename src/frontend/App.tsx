import { useState } from "react";
import Header from "./Components/Header";
import { MainContext, mainContextType } from "./mainContext/mainContext";
import SideBar from "./Components/SideBar";
import HomePage from "./HomePage";

function App() {
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const context: mainContextType = {
        isOpenMenu,
        setIsOpenMenu,
    };

    return (
        <MainContext.Provider value={context}>
            <div className={`max-h-screen h-screen text-white font-commissioner flex w-full`}>
                <SideBar />
                <div className={`flex-1 transition-all duration-300 ${isOpenMenu ? "ml-[250px]" : "ml-0"}`}>
                    <Header />
                    <HomePage />
                </div>
            </div>
        </MainContext.Provider>
    );
}

export default App;