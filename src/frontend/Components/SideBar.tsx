import { useContext } from "react";
import { MainContext } from "../mainContext/MainContext";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../backend/firebase";
import ChangeThemeButton from "./Theme/ChangeThemeButton";
import { toast } from "react-toastify";

const SideBar = () => {
    const c = useContext(MainContext);
    const documents = c?.data;
    const navigate = useNavigate();

    const handleClick = (documentId: string) => {
        navigate(`/document/${documentId}`);
        c?.setIsOpenMenu(false);
    };

    const createNewDoc = async () => {
        try {
            const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
            const writesRef = doc(db, "writes", today);
            const writesSnap = await getDoc(writesRef);

            const writeCount = writesSnap.exists()
                ? writesSnap.data().writeCount
                : 0;

            // Restrict to 6 writes per day
            if (writeCount >= 6) {
                toast.error("You have reached the daily limit of 6 new documents.");
                return;
            }

            const documentsRef = collection(db, "documents");

            // Fetch all documents to check for existing "Untitled Document" entries
            const snapshot = await getDocs(documentsRef);
            const titles = snapshot.docs.map((doc) => doc.data().title);

            // Find the highest numbered "Untitled Document"
            let newTitle = "Untitled Document";
            let count = 1;

            while (titles.includes(newTitle)) {
                count++;
                newTitle = `Untitled Document ${count}`;
            }

            // Create a new document
            const newDocRef = doc(collection(db, "documents"));

            await setDoc(newDocRef, {
                id: newDocRef.id, // Keep Firestore's auto-generated ID
                title: newTitle,
                text: "# Welcome to Markdown Editor",
                date: new Date(),
            });

            // Update or create the daily write count
            if (writesSnap.exists()) {
                await updateDoc(writesRef, { writeCount: writeCount + 1 });
            } else {
                await setDoc(writesRef, { writeCount: 1 });
            }

            // Navigate to the newly created document
            navigate(`/document/${newDocRef.id}`);
            c?.setIsOpenMenu(false);
        } catch (error) {
            console.error("Error creating new document:", error);
        }
    };

    return (
        <div
            className={`bg-DContainerBG w-[250px] left-0 top-0 h-screen fixed z-10 flex flex-col transition-transform duration-300 ${
                c?.isOpenMenu ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <div className="w-full px-6 flex flex-col flex-grow">
                <div className="py-3 flex flex-row justify-between items-center">
                    <p className="text-gray-400 tracking-widest flex text-sm">
                        MY DOCUMENTS
                    </p>
                    <button onClick={() => c?.setIsOpenMenu((prev) => !prev)}>
                        <i className="fa-solid fa-xmark md:hidden cursor-pointer text-xl"></i>
                    </button>
                </div>
                <div className="">
                    <button
                        className="bg-BGButton hover:bg-BGButtonHover duration-150 transition-colors w-full py-2 rounded-md"
                        onClick={createNewDoc}
                    >
                        + New Document
                    </button>
                </div>

                {/* Make this section grow to push the theme button down */}
                <div className="pt-5 flex flex-col gap-1 flex-grow overflow-y-auto">
                    {documents ? (
                        // Sort documents by date in ascending order (oldest first)
                        [...documents].sort((a, b) => a.date.toDate() - b.date.toDate()).map((doc) => (
                            <div
                                key={doc.id} // Use document ID as key
                                className="flex flex-row items-center gap-5 cursor-pointer hover:bg-DHeaderBG px-2 py-1 duration-150 transition"
                                onClick={() => handleClick(doc.id)} // Pass the document id to navigate
                            >
                                <i className="fa-regular fa-file text-xl"></i>
                                <div>
                                    <p className="m-0 text-gray-500 dark:text-gray-500 text-xs">
                                        {doc?.date
                                            ?.toDate()
                                            ?.toLocaleDateString() ||
                                            "No date available"}
                                    </p>
                                    <p className="m-0 text-white duration-150 transition-colors">
                                        {doc?.title || "Untitled.md"}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p></p>
                    )}
                </div>
            </div>

            {/* Theme button placed at the bottom */}
            <div className="px-6 py-4 mt-auto justify-center flex">
                <ChangeThemeButton />
            </div>
        </div>
    );
};

export default SideBar;
