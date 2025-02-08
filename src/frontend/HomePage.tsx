import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const HomePage = () => {
    return (
        <div className="flex flex-grow h-full">
            <PanelGroup direction="horizontal">
                <Panel defaultSize={50} minSize={20}>
                    <div className="h-full">
                        <p className="bg-DContainerBG">MARKDOWN</p>
                        <div className="h-full bg-DBG overflow-auto ">
                            <p>kdown editor window
                            2. See the rendered markdown in the preview window</p>
                        </div>
                    </div>
                </Panel>
                <PanelResizeHandle className="w-[0.06rem] bg-gray-500 hover:bg-gray-300 transition-colors" />
                <Panel defaultSize={50} minSize={20}>
                    <div className="h-full">
                        <p className="bg-DContainerBG">PREVIEW</p>
                        <div className="h-full bg-DBG ">
                        <p>kdown editor window
                        2. See the rendered markdown in the preview window</p>
                        </div>
                    </div>
                </Panel>
            </PanelGroup>
        </div>
    );
};

export default HomePage;
