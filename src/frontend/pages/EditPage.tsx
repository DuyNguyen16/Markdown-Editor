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
                        c?.setMarkdown(fetchedData.text || "");  // Load existing text
                    } else {
                        // If the document doesn't exist, set an empty markdown
                        c?.setMarkdown("");
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
        c?.setMarkdown(newMarkdown);

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

    return (
        <>
            <Header />
            <div className="flex flex-col h-[94%] overflow-hidden flex-grow">
                <PanelGroup
                    direction={isMobile ? "vertical" : "horizontal"}
                    className="flex-1"
                >
                    {!c?.fullView && (
                        <Panel
                            defaultSize={50}
                            minSize={30}
                            className="flex flex-col"
                        >
                            <div className="flex items-center px-5 h-[40px] tracking-[0.1rem] bg-WContainerBG dark:bg-DContainerBG">
                                <p className="text-black dark:text-gray-400">MARKDOWN</p>
                            </div>
                            <textarea
                                className="w-full flex-1 bg-WBG dark:bg-DBG border-none p-3 px-8 text-[16px] focus:outline-none text-black dark:text-colour-gray tracking-[1px]"
                                value={c?.markdown}
                                onChange={handleMarkdownChange}
                            ></textarea>
                        </Panel>
                    )}

                    {/* Resize Handle inside the first panel for alignment */}
                    <PanelResizeHandle className="relative flex items-center justify-center bg-black dark:bg-DHeaderBG hover:bg-gray-500 transition-all duration-300 ease-in-out h-2 md:h-full md:w-1"></PanelResizeHandle>

                    {/* Preview Panel */}
                    <Panel
                        defaultSize={50}
                        minSize={50}
                        className="flex flex-col"
                    >
                        <div className="flex justify-between items-center px-5 h-[40px] tracking-[0.1rem] bg-WContainerBG dark:bg-DContainerBG">
                            <p className="text-black dark:text-gray-400">PREVIEW</p>
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
                            className="flex-1 bg-WBG dark:bg-DBG text-black dark:text-white overflow-y-auto px-5"
                            dangerouslySetInnerHTML={{
                                __html: marked(c?.markdown || ""),
                            }}
                        ></div>
                    </Panel>
                </PanelGroup>
            </div>
        </>
    );
};

export default EditPage;
