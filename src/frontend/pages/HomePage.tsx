import { useContext, useEffect, useState } from "react";
import { marked } from "marked";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import "./markdown.css";
import { text, text2 } from "./text.tsx";
import { MainContext } from "../mainContext/MainContext.tsx";

const HomePage = () => {
    const c = useContext(MainContext);
    const [markdown, setMarkdown] = useState(text); // Initialize markdown with text
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (c?.currentDoc === 0) {
            setMarkdown(text); // Set markdown to text if currentDoc is 0
        } else if (c?.currentDoc === 1) {
            setMarkdown(text2); // Set markdown to text2 if currentDoc is 1
        }
    }, [c?.currentDoc]);

    return (
        <div className="h-[calc(100vh-3.5rem)] flex flex-grow overflow-hidden">
            <PanelGroup direction={isMobile ? "vertical" : "horizontal"}>
                {!c?.fullView && (
                    <Panel
                        defaultSize={isMobile ? 50 : 50} // Adjust default size
                        minSize={isMobile ? 100 : 30}
                    >
                        <div className="h-full flex flex-col">
                            <div className="flex flex-row bg-DContainerBG justify-between items-center px-5 py-2">
                                <p className="text-gray-400 tracking-[0.1rem] m-0 text-md">
                                    MARKDOWN
                                </p>
                            </div>
                            <textarea
                                className="flex-1 bg-DBG border-none overflow-y-auto p-1 px-4 text-sm focus:outline-none text-colour-gray tracking-[1px]"
                                value={markdown}
                                onChange={(e) => setMarkdown(e.target.value)}
                                
                            ></textarea>
                        </div>
                    </Panel>
                )}
                {!c?.fullView && !isMobile && (
                    <PanelResizeHandle className="w-[0.1rem] bg-gray-500" />
                )}
                <Panel
                    defaultSize={isMobile ? 50 : 50} // Adjust default size
                    minSize={isMobile ? 100 : 50}
                >
                    <div className="h-full flex flex-col">
                        <div className="flex flex-row bg-DContainerBG justify-between items-center px-5 py-2">
                            <p className="text-gray-400 tracking-[0.1rem] m-0 text-md">
                                PREVIEW
                            </p>
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
                            className="flex-1 bg-DBG overflow-y-auto p-1 px-4" 
                            dangerouslySetInnerHTML={{
                                __html: marked(markdown),
                            }}
                        ></div>
                    </div>
                </Panel>
            </PanelGroup>
        </div>
    );
};

export default HomePage;
