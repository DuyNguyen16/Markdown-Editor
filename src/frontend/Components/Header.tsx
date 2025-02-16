import { useContext, useEffect, useState } from "react";
import { MainContext } from "../mainContext/MainContext";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../backend/firebase";

const Header = () => {
    const c = useContext(MainContext);
    const { id } = useParams();
    const [docName, setDocName] = useState("Untitled Document");
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [originalMarkdown, setOriginalMarkdown] = useState<string | null>(null);
    const [ rename, isRename ] = useState(false)

    const handleRename = () => {

    }

    // Fetch document name & content when opening an existing document
    useEffect(() => {
        const fetchDocument = async () => {
            if (!id) return;

            try {
                const documentRef = doc(db, "documents", id);
                const documentDoc = await getDoc(documentRef);

                if (documentDoc.exists()) {
                    const data = documentDoc.data();
                    setDocName(data.title || "Untitled Document");
                    c?.setMarkdown(data.text || "");
                    setOriginalMarkdown(data.text || ""); // Store original markdown
                }
            } catch (error) {
                console.error("Error fetching document:", error);
            }
        };

        fetchDocument();
    }, [id]);

    const handleSave = async () => {
        if (!c?.markdown.trim()) {
            toast.error("Markdown cannot be empty!");
            return;
        }

        if (c.markdown === originalMarkdown) {
            toast.info("No changes detected. Nothing to save.");
            return;
        }

        try {
            const documentId = id || docName; // Use existing ID or new name
            const documentRef = doc(db, "documents", documentId);
            const documentDoc = await getDoc(documentRef);

            if (!id && documentDoc.exists()) {
                toast.error(`Assignment name "${docName}" already exists!`);
                return;
            }

            await setDoc(documentRef, {
                id: documentId,
                title: docName,
                text: c.markdown,
                date: new Date(),
            });

            setOriginalMarkdown(c.markdown); // Update original markdown after saving
            toast.success("Document saved successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to save the document. Please try again.");
        }
    };

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
                {c?.isOpenMenu ? (
                    <i className="fa-solid fa-xmark md:text-2xl "></i>
                ) : (
                    <i className="fa-solid fa-bars md:text-2xl"></i>
                )}
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
                        <p className="m-0 text-gray-500 text-xs">04 January 2025</p>
                        <p className="m-0 text-white">{docName}</p>
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    <button className="">
                        <i className="fa-regular fa-trash-can text-gray-400 text-lg hover:text-[#E46643] duration-150 transition-colors"></i>
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex justify-center gap-2 items-center py-3 px-3 md:py-2 md:px-4 bg-BGButton hover:bg-BGButtonHover duration-150 transition-colors rounded-md"
                    >
                        <i className="fa-regular fa-floppy-disk"></i>
                        {!isMobile && "Save changes"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
