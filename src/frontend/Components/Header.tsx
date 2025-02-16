import { useContext, useEffect, useState } from "react";
import { MainContext } from "../mainContext/MainContext";
import { Link, useParams } from "react-router-dom";

const Header = () => {
    const c = useContext(MainContext);
    const {id}  = useParams();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="bg-DHeaderBG flex items-center h-[6%] text-white w-full">
            <div
                className="flex items-center bg-DMenuBG h-full w-16 md:w-20 justify-center cursor-pointer"
                onClick={() => c?.setIsOpenMenu((prev) => !prev)}
            >
                {c?.isOpenMenu ? <i className="fa-solid fa-xmark md:text-2xl "></i> : <i className="fa-solid fa-bars md:text-2xl"></i>}
            </div>
            <div className="px-6 hidden md:block">
                <Link className="text-white font-bold tracking-[0.2rem] cursor-pointer" to={"/"}>
                    MARKDOWN
                </Link>
            </div>
            <div className="md:w-[0.07rem] bg-gray-600 h-11"></div>
            <div className="px-3 md:px-6 flex flex-row justify-between w-full items-center">
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
                    <button className="flex justify-center gap-2 items-center py-3 px-3 md:py-2 md:px-4 bg-BGButton hover:bg-BGButtonHover duration-150 transition-colors rounded-md">
                        <i className="fa-regular fa-floppy-disk"></i>
                        {!isMobile && "Save changes"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
