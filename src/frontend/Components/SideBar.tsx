import { useContext } from "react";
import { MainContext } from "../mainContext/MainContext";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
    const c = useContext(MainContext);
    const documents = c?.data;
    const navigate = useNavigate()

    const handleClick = (index : number) => {
        if (documents) {
        const myId = documents[index].id
        navigate(`/${myId}`)
        c?.setIsOpenMenu(false);
        }
    };

    return (
        <div
            className={`bg-DContainerBG w-[250px] left-0 top-0 h-screen fixed z-10 transition-transform duration-300 ${
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
                    {documents ? documents?.map((doc, index) => (
                        <div
                            key={index}
                            className="flex flex-row items-center gap-5 cursor-pointer hover:bg-DHeaderBG px-2 py-1 duration-150 transition"
                            onClick={() => handleClick(index)} // Pass the index to handleClick
                        >
                            <i className="fa-regular fa-file text-xl"></i>
                            <div>
                                <p className="m-0 text-gray-500 text-xs">
                                    {/* Assuming 'date' is a property in your document */}
                                    {doc?.date.toDate().toLocaleDateString() || "No date available"}
                                </p>
                                <p className="m-0 text-white duration-150 transition-colors">
                                    {/* Assuming 'title' is a property in your document */}
                                    {doc?.title || "Untitled.md"}
                                </p>
                            </div>
                        </div>
                    )) : <p></p>}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
