import { useContext, useEffect, useState } from "react";
import { text, text2 } from "./text";
import { MainContext } from "../mainContext/MainContext";
import { Panel, PanelGroup } from "react-resizable-panels";
import { marked } from "marked";

const EditPage = () => {
    const c = useContext(MainContext);
    const [markdown, setMarkdown] = useState(text);

    useEffect(() => {
        if (c?.currentDoc === 0) {
            setMarkdown(text);
        } else if (c?.currentDoc === 1) {
            setMarkdown(text2);
        }
    }, [c?.currentDoc]);

    return (
        <div className="flex flex-col flex-grow h-full overflow-hidden">
            <PanelGroup direction="vertical" className="flex-1 h-full">
                {!c?.fullView && (
                    <Panel defaultSize={50} className="flex-1">
                        <div className="h-full flex flex-col">
                            <div className="flex flex-row bg-DContainerBG justify-between items-center px-5 py-2">
                                <p className="text-gray-400 tracking-[0.1rem] m-0 text-md">MARKDOWN</p>
                            </div>
                            <textarea
                                className="flex-1 bg-DBG border-none overflow-y-auto p-1 px-8 text-sm focus:outline-none text-colour-gray tracking-[1px]"
                                value={markdown}
                                onChange={(e) => setMarkdown(e.target.value)}
                            ></textarea>
                        </div>
                    </Panel>
                )}
                <Panel defaultSize={50} className="flex-1">
                    <div className="h-full flex flex-col">
                        <div className="flex flex-row bg-DContainerBG justify-between items-center px-5 py-2">
                            <p className="text-gray-400 tracking-[0.1rem] m-0 text-md">PREVIEW</p>
                            <i
                                className={`${c?.fullView ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"} 
                                cursor-pointer hover:text-myOrange duration-150 transition-colors pr-2 md:pr-0`}
                                onClick={() => c?.setFullView((prev) => !prev)}
                            ></i>
                        </div>
                        <div className="flex-1 bg-DBG overflow-y-auto p-1 px-8"
                            dangerouslySetInnerHTML={{ __html: marked(markdown) }}
                        ></div>
                    </div>
                </Panel>
            </PanelGroup>
        </div>
    );
};


export default EditPage;
