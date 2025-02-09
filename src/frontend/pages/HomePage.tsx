import { useState } from "react";
import { marked } from "marked";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import './markdown.css'

const HomePage = () => {
    const [markdown, setMarkdown] = useState("# Hello, Markdown!");
    console.log(marked(markdown));
    return (
        <div className="flex flex-grow h-full overflow-hidden">
            <PanelGroup direction="horizontal">
                <Panel defaultSize={50} minSize={30}>
                    <div className="h-full flex flex-col">
                        <h4 className="bg-DContainerBG px-5 py-2 text-gray-400 tracking-[0.1rem]">
                            MARKDOWN
                        </h4>
                        <textarea
                            className="flex-1 bg-DBG border-none overflow-y-auto p-2 px-4 focus:outline-none text-colour-gray"
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                        ></textarea>
                    </div>
                </Panel>
                <PanelResizeHandle className="w-[0.08rem] bg-gray-500" />
                <Panel defaultSize={50} minSize={50}>
                    <div className="h-full flex flex-col">
                        <h4 className="bg-DContainerBG px-5 py-2 text-gray-400 tracking-[0.1rem]">
                            PREVIEW
                        </h4>
                        <div
                            className="flex-1 bg-DBG overflow-y-auto p-1 px-4 font-robotoSlab"
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