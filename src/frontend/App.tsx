/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { MainContext, mainContextType } from "./mainContext/MainContext";
import SideBar from "./Components/SideBar";
import EditPage from "./pages/EditPage";
import { db } from "../backend/firebase";
import { collection, getDocs } from "firebase/firestore";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";

function App() {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [fullView, setFullView] = useState(false);
    const [currentDoc, setCurrentDoc] = useState(0);
    const [data, setData] = useState<any[]>([]);
    const [markdown, setMarkdown] = useState("");

    const getData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "documents"));
            const docsArray = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setData(docsArray); // Store array of documents
        } catch (e) {
            console.error("Error fetching documents:", e);
        }
    };

    useEffect(() => {
        const get = async () => {
            await getData();
        };
        get();
    }, [data]);

    const context: mainContextType = {
        isOpenMenu,
        setIsOpenMenu,
        fullView,
        setFullView,
        currentDoc,
        setCurrentDoc,
        data,
        markdown, 
        setMarkdown
    };

    return (
        <MainContext.Provider value={context}>
            <BrowserRouter>
            <ToastContainer
                    className="mt-3 md:mt-14"
                    position="top-right"
                    autoClose={3000}
                />
                <div className="bg-DBG h-screen max-h-screen flex flex-col w-full text-white font-commissioner overflow-hidden">
                    <SideBar />
                    <div
                        className={`w-full h-full transition-all duration-300 ${
                            isOpenMenu
                                ? "md:ml-[250px] overflow-hidden"
                                : "ml-0"
                        }`}
                    >
                        <Routes>
                            <Route path="" element={<Home />}/>
                            <Route path="/:id" element={<EditPage />} />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </MainContext.Provider>
    );
}

export default App;
