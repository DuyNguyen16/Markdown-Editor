import { useContext, useEffect, useState, useRef } from "react";
import { text, text2 } from "./text";
import { MainContext } from "../mainContext/MainContext";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { marked } from "marked";
import "./markdown.css";

const EditPage = () => {
    const c = useContext(MainContext);
    const [markdown, setMarkdown] = useState(text);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const previewRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (c?.currentDoc === 0) {
            setMarkdown(text);
        } else if (c?.currentDoc === 1) {
            setMarkdown(text2);
        }
    }, [c?.currentDoc]);

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

    return (
        <div className="flex flex-col h-[94%] overflow-hidden flex-grow ">
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
                    </Panel>
                )}
                {!c?.fullView && (
                    <div>
                        <PanelResizeHandle className="z-0 w-8 md:w-10 -translate-y-8 md:translate-y-0 fixed h-8 md:h-10 bg-DMenuBG md:-translate-x-10 justify-center items-center flex"><i className={`${isMobile ? "fa-solid fa-arrows-up-down" : "fa-solid fa-arrows-left-right"}`}></i></PanelResizeHandle>
                        
                        
                    </div>
                )}
                {/* Preview */}
                <Panel defaultSize={50} minSize={50} className="flex flex-col">
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
    );
};

export default EditPage;
