import { useContext } from "react";
import menu from "../assets/Group.png";
import save from "../assets/save.png";
import { MainContext } from "../mainContext/MainContext";

const Header = () => {
    const c = useContext(MainContext);

    return (
        <div className="bg-DHeaderBG h-[4.5rem] flex items-center text-white w-full">
            <div
                className="h-full flex items-center bg-DMenuBG px-6 cursor-pointer"
                onClick={() => c?.setIsOpenMenu((prev) => !prev)}
            >
                <img className="" src={menu} alt="Menu" />
            </div>
            <div className="px-6">
                <p className="text-white font-bold tracking-[0.2rem]">
                    MARKDOWN
                </p>
            </div>
            <div className="w-[0.07rem] bg-gray-600 h-11"></div>
            <div className="px-6 flex flex-row justify-between w-full items-center">
                <div className="flex flex-row items-center gap-5 cursor-pointer">
                    <i className="fa-regular fa-file text-xl"></i>
                    <div>
                        <p className="m-0 text-gray-500 text-xs">
                            04 January 2025
                        </p>
                        <p className="m-0 text-white">Example.md</p>
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    <button className="">
                        <i className="fa-regular fa-trash-can text-gray-400 text-lg hover:text-[#E46643] duration-150 transition-colors"></i>
                    </button>
                    <button className="flex justify-center gap-2 items-center py-2 px-4 bg-BGButton hover:bg-BGButtonHover duration-150 transition-colors rounded-md">
                        <img src={save} />
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
