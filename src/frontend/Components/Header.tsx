import { useContext, useEffect, useState } from "react";
import { MainContext } from "../mainContext/MainContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, getDoc, setDoc, deleteDoc, updateDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../backend/firebase";

const Header = () => {
    const c = useContext(MainContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [docName, setDocName] = useState("Untitled Document");
    const [isRename, setIsRename] = useState(false);
    const [newName, setNewName] = useState(docName);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [originalMarkdown, setOriginalMarkdown] = useState<string | null>(
        null
    );
    const [date, setDate] = useState("");

    useEffect(() => {
        const fetchDocument = async () => {
            if (!id) return; // Skip fetching if there's no document ID (e.g., on the home page)

            try {
                const documentRef = doc(db, "documents", id);
                const documentDoc = await getDoc(documentRef);

                if (documentDoc.exists()) {
                    const data = documentDoc.data();
                    setDocName(data.title || "Untitled Document");
                    setNewName(data.title || "Untitled Document");
                    setDate(data.date.toDate().toLocaleDateString());
                    c?.setMarkdown(data.text || "");
                    setOriginalMarkdown(data.text || "");
                }
            } catch (error) {
                console.error("Error fetching document:", error);
            }
        };

        fetchDocument();
    }, [id]);

    const handleRename = async () => {
        if (newName.trim() === "") {
            toast.error("Document name cannot be empty!");
            return;
        }
    
        if (newName === docName) {
            setIsRename(false);
            return;
        }
    
        try {
            // Check if a document with the same name already exists
            const documentsRef = collection(db, "documents");
            const snapshot = await getDocs(documentsRef);
            const existingTitles = snapshot.docs.map((doc) => doc.data().title);
    
            if (existingTitles.includes(newName)) {
                setNewName(docName)
                toast.error("A document with this name already exists!");
                return;
            }
    
            // Update the document name
            await updateDoc(doc(db, "documents", id!), { title: newName });
            setDocName(newName);
            toast.success("Document renamed successfully!");
        } catch (error) {
            console.error("Error renaming document:", error);
            toast.error("Failed to rename document. Please try again.");
        } finally {
            setIsRename(false);
        }
    };
    

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
            await setDoc(doc(db, "documents", id!), {
                id,
                title: docName,
                text: c.markdown,
                date: new Date(),
            });

            setOriginalMarkdown(c.markdown);
            toast.success("Document saved successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to save the document. Please try again.");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, "documents", id!));
            toast.success("Document deleted successfully!");
            setShowDeletePopup(false);
            navigate("/"); // Redirect to home after deletion
        } catch (error) {
            console.error("Error deleting document:", error);
            toast.error("Failed to delete the document.");
        }
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="bg-DHeaderBG flex items-center h-[6%] text-white w-full relative">
            {/* Mobile and Menu Toggle */}
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

            {/* Logo/Title */}
            <div className="px-6 hidden md:block">
                <Link
                    className="text-white font-bold tracking-[0.2rem] cursor-pointer"
                    to={"/"}
                >
                    MARKDOWN
                </Link>
            </div>
            <div className="md:w-[0.07rem] bg-gray-600 h-11"></div>

            {/* Document Header */}
            {id ? (
                <div className="px-3 md:px-6 flex flex-row justify-between w-full items-center">
                    <div className="flex flex-row items-center cursor-pointer">
                        <i className="fa-regular fa-file text-xl pr-4"></i>
                        <div>
                            <p className="m-0 text-gray-500 dark:text-gray-500 text-xs">
                                {date}
                            </p>
                            {isRename && docName != "Sample Document" ? (
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    onBlur={handleRename} // Save on blur
                                    onKeyDown={(e) =>
                                        e.key === "Enter" && handleRename()
                                    } // Save on Enter
                                    autoFocus
                                    className="text-white border-b border-gray-400 bg-DHeaderBG outline-none w-full"
                                />
                            ) : (
                                <div className="flex items-center gap-2">
                                    <p className="m-0 text-white cursor-pointer hover:underline">
                                        {docName}
                                    </p>
                                </div>
                            )}
                        </div>
                        {docName !== "Sample Document" &&
                            (isRename ? (
                                <i className="fa-solid fa-xmark md:text-2xl pl-2 text-red-500"></i>
                            ) : (
                                <i
                                    className="fa-solid fa-pen text-white cursor-pointer pl-2 hover:text-[#E46643] duration-150 transition"
                                    onClick={() => setIsRename(true)}
                                />
                            ))}
                    </div>
                    {docName !== "Sample Document" && (
                        <div className="flex items-center gap-5">
                            <button onClick={() => setShowDeletePopup(true)}>
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
                    )}
                </div>
            ) : (
                <div className="px-3 md:px-6 flex flex-row justify-between w-full items-center">
                    <p className="text-white text-xl font-semibold">
                        Welcome to Markdown Editor
                    </p>
                </div>
            )}

            {/* Delete Confirmation Popup */}
            {showDeletePopup && (
                <div className="fixed inset-0 z-20 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-DContainerBG p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-white text-lg font-bold mb-4">
                            Delete Document?
                        </h2>
                        <p className="text-gray-400 text-sm">
                            Are you sure you want to delete{" "}
                            <strong>{docName}</strong>? This action cannot be
                            undone.
                        </p>
                        <div className="flex justify-end gap-4 mt-5">
                            <button
                                onClick={() => setShowDeletePopup(false)}
                                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
