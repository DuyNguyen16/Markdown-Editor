import { useContext } from "react";
import sun from "../../assets/sun.png";
import moon from "../../assets/moon.png"
import moonActive from "../../assets/moonActive.png";
import sunActive from "../../assets/sunActive.png";
import { MainContext } from "../../mainContext/MainContext";

const ChangeThemeButton = () => {
    const c = useContext(MainContext);
    if (!c) {
        throw new Error("App must be used within a mainContext.Provider");
    }

    return (
        <div className="flex items-center gap-3">
            {/* Icon Display */}
            <button
                onClick={c.toggleTheme}
                className="text-2xl px-1 rounded-lg dark:text-white duration-150"
            >
                {c.theme === "dark" ? (
                    <img src={sun} alt="Sun Icon" />
                ) : (
                    <img src={sunActive} alt="Sun Icon" />
                )}
            </button>

            {/* Toggle Switch */}
            <div
                className={`w-14 h-6 flex items-center p-1 rounded-full cursor-pointer transition-colors duration-300 ${
                    c.theme === "dark" ? "bg-blue-500" : "bg-yellow-400"
                }`}
                onClick={c.toggleTheme}
            >
                <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                        c.theme === "dark"
                            ? "translate-x-[1.85rem]"
                            : "-translate-x-[0.1rem]"
                    }`}
                ></div>
            </div>

            {/* Icon Display */}
            {c.theme === "dark" ? (
                <img src={moonActive} alt="Moon Icon" />
            ) : (
                <img src={moon} alt="Moon Icon" />
            )}
        </div>
    );
};

export default ChangeThemeButton;
