import React from "react";
import { Dialog, Typography } from "@material-tailwind/react";
import DeleteIcon from "../assets/delete.png";
import UncheckedIcon from "../assets/unchecked-icon.png";
import CheckedIcon from "../assets/checked-icon.png";

function TodoDialog({
  title,
  description,
  id,
  isActive,
  deleteTodo,
  toggleIcon,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <div>
      <div
        className={`cursor-pointer ${
          isActive ? "line-through opacity-40" : ""
        }`}
        onClick={handleOpen}
      >
        <div className="text-white border p-5 rounded-lg hover:scale-105 duration-200">
          <p className="font-bold text-xl mb-2">{title}</p>
          <p className="font-light ">{description}</p>
        </div>
      </div>
      <Dialog
        open={open}
        handler={handleOpen}
        className={`bg-inherit border px-10 py-8 text-white ${
          isActive ? "line-through opacity-40" : ""
        }`}
      >
        <p className="font-bold text-4xl mb-2">{title}</p>
        <p className="font-light ">{description}</p>
        <div className="flex gap-3 mt-10 justify-center">
          <img
            onClick={() => toggleIcon(id)}
            src={isActive ? CheckedIcon : UncheckedIcon}
            className="w-7 hover:scale-110 duration-200"
            alt=""
          />
          <img
            onClick={() => {
              deleteTodo(id);
            }}
            src={DeleteIcon}
            className="w-7 hover:scale-110 duration-200"
            alt=""
          />
        </div>
      </Dialog>
    </div>
  );
}

export default TodoDialog;
