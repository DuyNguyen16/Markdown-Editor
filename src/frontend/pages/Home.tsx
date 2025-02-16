import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../backend/firebase";
import { useContext } from "react";
import { MainContext } from "../mainContext/MainContext";

const Home = () => {
    const c = useContext(MainContext)
    const navigate = useNavigate();


    const createNewDoc = async () => {
        try {
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

            // Navigate to the newly created document
            navigate(`/document/${newDocRef.id}`);
            c?.setIsOpenMenu(false)
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
