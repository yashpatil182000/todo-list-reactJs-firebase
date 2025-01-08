import { useEffect, useState } from "react";
import AddDialog from "./components/AddDialog.jsx";
import TodoDialog from "./components/TodoDialog.jsx";
import { collection, doc, getDocs, query } from "firebase/firestore";
import { db } from "./firebase.js";

function App() {
  const [todos, setTodos] = useState([]);

  // useEffect(async () => {
  //   const querySnapshot = await getDocs(collection(db, "todos"));
  //   const todoList = querySnapshot.docs.map((doc) => {
  //     doc.data();
  //   });
  //   setTodos(todoList);
  // }, []);
  // console.log(todos);

  useEffect(async () => {
    const querySnapshot = await getDocs(collection(db, "todos"));
    querySnapshot.docs.forEach((doc) => {
      console.log(doc.data());
      setTodos(doc.data());
    });
  }, []);

  return (
    <div className="p-10">
      <div>
        <p className="text-center font-semibold text-4xl text-white">
          To Do List
        </p>
        <p className="text-white opacity-40 text-sm text-center font-light ">
          using ReactJs | Firebase
        </p>
      </div>
      <div className=" my-10 flex flex-wrap items-center justify-center gap-5">
        <AddDialog />

        <div className="text-white border p-5 rounded-lg hover:scale-105 duration-200">
          <p className="font-bold text-xl mb-2">Title</p>
          <p className="font-light ">Description</p>
        </div>
      </div>
    </div>
  );
}

export default App;
