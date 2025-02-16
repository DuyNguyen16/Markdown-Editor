import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../backend/firebase";
import { useContext } from "react";
import { MainContext } from "../mainContext/MainContext";
import { toast } from "react-toastify";

const Home = () => {
    const c = useContext(MainContext)
    const navigate = useNavigate();


    const createNewDoc = async () => {
        try {
            const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
            const writesRef = doc(db, "writes", today);
            const writesSnap = await getDoc(writesRef);

            const writeCount = writesSnap.exists()
                ? writesSnap.data().writeCount
                : 0;

            // Restrict to 10 writes per day
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
        <>
            <Header />
            <div className="flex flex-col items-center justify-center h-screen text-center px-6">
                <h1 className="text-3xl md:text-4xl font-bold text-[#151619] dark:text-white mb-4">
                    Welcome to Markdown Editor
                </h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-lg">
                    Markdown Editor is a powerful, yet simple tool for creating, editing, and managing your markdown files. 
                    Whether you're writing notes, documentation, or blog drafts, this editor helps you format and structure 
                    your content easily.
                </p>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-lg mt-2">
                    Start by creating a new document or selecting an existing one from the sidebar.
                    Your work is automatically saved, so you never lose progress.
                </p>
                <button 
                    className="mt-6 bg-BGButton hover:bg-BGButtonHover text-white font-medium px-6 py-3 rounded-md transition-all"
                    onClick={createNewDoc} // Triggers the New Document button from Sidebar
                >
                    Create New Document
                </button>
            </div>
        </>
    );
};

export default Home;
