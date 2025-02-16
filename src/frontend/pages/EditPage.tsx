import { useContext, useEffect, useState, useRef } from "react";
import { MainContext } from "../mainContext/MainContext";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { marked } from "marked";
import "./markdown.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../backend/firebase";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";

const EditPage = () => {
    const c = useContext(MainContext);
    const { id } = useParams();
    const [markdown, setMarkdown] = useState("");
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const previewRef = useRef<HTMLDivElement | null>(null);

    // Fetch document by ID on mount or when `id` changes
    useEffect(() => {
        if (id) {
            const fetchDocument = async () => {
                try {
                    const docRef = doc(db, "documents", id);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const fetchedData = docSnap.data();
                        setMarkdown(fetchedData.text || "");
                    } else {
                        console.log("No such document!");
                    }
                } catch (e) {
                    console.error("Error getting document: ", e);
                }
            };

            fetchDocument();
        }
    }, [id]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleMarkdownChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const newMarkdown = e.target.value;
        setMarkdown(newMarkdown);

        // Scroll the preview panel to the same position as the cursor in the editor
        if (previewRef.current) {
            const textarea = e.target;
            const cursorPosition = textarea.selectionStart;
            const lineHeight = parseInt(
                window.getComputedStyle(textarea).lineHeight
            );
            const scrollTop = cursorPosition * lineHeight;

            previewRef.current.scrollTo({
                top: scrollTop,
                behavior: "smooth",
            });
        }
    };

    // Save function that adds markdown content to Firestore
    // const handleSave = async () => {
    //     try {
    //         // Saving the current markdown content to Firestore
    //         await addDoc(collection(db, "documents"), {
    //             text: markdown,
    //             timestamp: new Date(),
    //         });
    //         console.log("Document successfully saved!");
    //     } catch (e) {
    //         console.error("Error adding document: ", e);
    //     }
    // };

    return (
        <>
            <Header />
            <div className="flex flex-col h-[94%] overflow-hidden flex-grow">
                <PanelGroup
                    direction={isMobile ? "vertical" : "horizontal"}
                    className="flex-1"
                >
                    {/* Markdown Editor */}
                    {!c?.fullView && (
                        <Panel
                            defaultSize={50}
                            minSize={30}
                            className="flex flex-col"
                        >
                            <div className="flex items-center px-5 h-[40px] text-gray-400 tracking-[0.1rem] bg-DContainerBG">
                                <p>MARKDOWN</p>
                            </div>
                            <textarea
                                className="w-full flex-1 bg-DBG border-none p-3 px-8 text-[16px] focus:outline-none text-colour-gray tracking-[1px]"
                                value={markdown}
                                onChange={handleMarkdownChange}
                            ></textarea>
                            {/* Save Button */}
                            {/* <button
                            className="mt-3 bg-blue-500 text-white py-2 px-4 rounded"
                            onClick={handleSave}
                        >
                            Save to Database
                        </button> */}
                        </Panel>
                    )}
                    <PanelResizeHandle className="z-0 w-8 md:w-10 -translate-y-8 md:translate-y-0 fixed h-8 md:h-10 bg-DMenuBG md:-translate-x-10 justify-center items-center flex">
                        <i
                            className={`${
                                isMobile
                                    ? "fa-solid fa-arrows-up-down"
                                    : "fa-solid fa-arrows-left-right"
                            }`}
                        ></i>
                    </PanelResizeHandle>
                    {/* Preview */}
                    <Panel
                        defaultSize={50}
                        minSize={50}
                        className="flex flex-col"
                    >
                        <div className="flex justify-between items-center px-5 h-[40px] text-gray-400 tracking-[0.1rem] bg-DContainerBG">
                            <p>PREVIEW</p>
                            <i
                                className={`${
                                    c?.fullView
                                        ? "fa-regular fa-eye-slash"
                                        : "fa-regular fa-eye"
                                } cursor-pointer hover:text-myOrange duration-150 transition-colors pr-2 md:pr-0`}
                                onClick={() => c?.setFullView((prev) => !prev)}
                            ></i>
                        </div>
                        <div
                            ref={previewRef}
                            className="flex-1 bg-DBG overflow-y-auto px-5"
                            dangerouslySetInnerHTML={{
                                __html: marked(markdown),
                            }}
                        ></div>
                    </Panel>
                </PanelGroup>
            </div>
        </>
    );
};

export default EditPage;
