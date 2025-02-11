import { useContext } from "react";
import { MainContext } from "../mainContext/MainContext";

const SideBar = () => {
    const c = useContext(MainContext);

    return (
        <div
            className={`bg-DContainerBG w-[250px] left-0 top-0 h-screen fixed transition-transform duration-300 ${
                c?.isOpenMenu ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <div className="w-full px-6">
                <div className="py-3 flex flex-row justify-between items-center">
                    <p className="text-gray-400 tracking-widest flex text-sm">
                        MY DOCUMENTS
                    </p>
                    <button onClick={() => c?.setIsOpenMenu((prev) => !prev)}>
                        <i className="fa-solid fa-xmark md:hidden cursor-pointer text-xl"></i>
                    </button>
                </div>
                <div className="">
                    <button className="bg-BGButton hover:bg-BGButtonHover duration-150 transition-colors w-full py-2 rounded-md">
                        + New Document
                    </button>
                </div>
                <div className="pt-5 flex flex-col gap-1">
                    <div
                        className="flex flex-row items-center gap-5 cursor-pointer hover:bg-DHeaderBG px-2 py-1 duration-150 transition"
                        onClick={() => c?.setCurrentDoc(0)}
                    >
                        <i className="fa-regular fa-file text-xl"></i>
                        <div>
                            <p className="m-0 text-gray-500 text-xs">
                                04 January 2025
                            </p>
                            <p className="m-0 text-white  duration-150 transition-colors">
                                Example.md
                            </p>
                        </div>
                    </div>
                    <div
                        className="flex flex-row items-center gap-5 cursor-pointer hover:bg-DHeaderBG px-2 py-1 duration-150 transition"
                        onClick={() => c?.setCurrentDoc(1)}
                    >
                        <i className="fa-regular fa-file text-xl"></i>
                        <div>
                            <p className="m-0 text-gray-500 text-xs">
                                04 January 2025
                            </p>
                            <p className="m-0 text-white duration-150 transition-colors">
                                Untitled.md
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
