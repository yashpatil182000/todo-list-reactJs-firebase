import React, { useState, useRef } from "react";
import PlusIcon from "../assets/plus.png";
import { db } from "../firebase";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";

export default function AddDialog() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = async () => {
    // let id = crypto.randomUUID();
    if (title && description) {
      console.log("adding to firebase");

      try {
        const docRef = await addDoc(collection(db, "todos"), {
          title: title,
          description: description,
          status: false,
        });
        await updateDoc(doc(db, "todos", docRef.id), { id: docRef.id });

        console.log("added successfully");
        setTitle("");
        setDescription("");
        setOpen(false);
      } catch (error) {
        console.log("failed to add todo:: Error::", error);
      }
    } else {
      alert("Input fields cannot be empty!");
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg ">
      <button onClick={handleOpen}>
        <img
          src={PlusIcon}
          className="w-10 hover:scale-110 duration-200"
          alt=""
        />
      </button>

      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Add To Do
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter To Do Title and Description
            </Typography>
            <Typography className="-mb-2" variant="h6">
              To Do Title
            </Typography>
            <Input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="text"
              label="Title"
              size="lg"
            />
            <Typography className="-mb-2" variant="h6">
              To Do Description
            </Typography>
            <Textarea
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              label="Description"
              size="lg"
            />
          </CardBody>
          <CardFooter className="pt-0 grid place-content-center">
            <Button variant="gradient" onClick={handleAdd}>
              Add
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
}
