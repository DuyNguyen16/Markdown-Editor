/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { MainContext, mainContextType } from "./mainContext/MainContext";
import SideBar from "./Components/SideBar";
import EditPage from "./pages/EditPage";
import { db } from "../backend/firebase";
import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import { useTheme } from "./Components/Theme/useTheme";

function App() {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [fullView, setFullView] = useState(false);
    const [currentDoc, setCurrentDoc] = useState(0);
    const [data, setData] = useState<DocumentData[]>([]);
    const [markdown, setMarkdown] = useState("");
    const { theme, toggleTheme } = useTheme();

    // Fetch data only once and update in real-time
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "documents"), (snapshot) => {
            const docsArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setData(docsArray); // Update state when Firestore changes
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

    const context: mainContextType = {
        isOpenMenu,
        setIsOpenMenu,
        fullView,
        setFullView,
        currentDoc,
        setCurrentDoc,
        data,
        markdown,
        setMarkdown,
        theme, toggleTheme
    };

    return (
        <MainContext.Provider value={context}>
            <BrowserRouter>
                <ToastContainer className="mt-3 md:mt-14" position="top-right" autoClose={3000} />
                <div className="dark:bg-DBG h-screen max-h-screen flex flex-col w-full text-white font-commissioner overflow-hidden">
                    <SideBar />
                    <div
                        className={`w-full h-full transition-all duration-300 ${
                            isOpenMenu ? "md:ml-[250px] overflow-hidden" : "ml-0"
                        }`}
                    >
                        <Routes>
                            <Route path="" element={<Home />} />
                            <Route path="/document/:id" element={<EditPage />} />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </MainContext.Provider>
    );
}

export default App;
