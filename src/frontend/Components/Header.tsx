import menu from "../assets/Group.png";
import save from "../assets/save.png";

const Header = () => {
    return (
        <div className="bg-DHeaderBG h-[4.5rem] flex items-center font-commissioner text-white">
            <div className="h-full flex items-center bg-DMenuBG px-6 cursor-pointer">
                <img className="" src={menu} alt="Menu" />
            </div>
            <div className="px-6">
                <p className="text-white font-bold tracking-[0.2rem]">
                    MARKDOWN
                </p>
            </div>
            <div className="w-[0.07rem] bg-gray-600 h-11"></div>
            <div className="px-6 flex flex-row justify-between w-full items-center">
                <div>Document</div>
                <div className="flex items-center">
                    <button className=""></button>
                    <button className="flex justify-center gap-2 items-center py-2 px-4 bg-BGButton hover:bg-BGButtonHover duration-150 transition-colors">
                        <img src={save} />
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
