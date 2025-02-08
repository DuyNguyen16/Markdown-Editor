import { useContext } from "react";
import { MainContext } from "../mainContext/mainContext";

const SideBar = () => {
    const c = useContext(MainContext);

    return (
        <div
            className={`bg-DContainerBG w-[250px] left-0 top-0 h-screen fixed transition-transform duration-300 ${
                c?.isOpenMenu ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <div className="w-full pt-6 px-6">
                <p className="text-gray-400 tracking-widest flex text-sm">
                    MY DOCUMENTS
                </p>
            </div>
        </div>
    );
};

export default SideBar;