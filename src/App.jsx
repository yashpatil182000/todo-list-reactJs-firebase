import { useEffect, useState } from "react";
import AddDialog from "./components/AddDialog.jsx";
import TodoDialog from "./components/TodoDialog.jsx";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase.js";

function App() {
  const [todos, setTodos] = useState([]);

  const fetchToDos = async () => {
    const querySnapshot = await getDocs(collection(db, "todos"));
    const todoList = querySnapshot.docs.map((doc) => {
      return doc.data();
    });
    setTodos(todoList);
  };

  const toggleIcon = async (id) => {
    try {
      const todoRef = doc(db, "todos", id);
      const todoSnap = await getDoc(todoRef);

      if (todoSnap.exists()) {
        const currentStatus = todoSnap.data().status;
        await updateDoc(todoRef, { status: !currentStatus });
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("TOGGLE ICON FUNCTION :: ERROR :: ", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id)).then(console.log(id, "deleted"));
    } catch (error) {
      console.log("DELETE TODO FUNCTION :: ERROR :: ", error);
    }
  };

  useEffect(() => {
    fetchToDos();
  }, [deleteTodo, toggleIcon]);

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

        {/* <p>{JSON.stringify(todos)}</p> */}

        {todos &&
          todos.map((todo, index) => {
            return (
              <TodoDialog
                key={index}
                title={todo.title}
                description={todo.description}
                id={todo.id}
                isActive={todo.status}
                deleteTodo={deleteTodo}
                toggleIcon={toggleIcon}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
