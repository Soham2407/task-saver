import React from "react";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";

const ListItem = ({ note, checkHandler, deleteHandler, editHandler }) => {
  const { id, title, isChecked } = note;
  return (
    <li className="ml-4 list-item">
      <input
        type="checkbox"
        className="form-check-input"
        checked={isChecked}
        onChange={() => checkHandler(id)}
      />
      <label
        className="ml-3 list-item-label"
        style={{ textDecoration: isChecked ? "line-through" : "none" }}
      >
        {title}
      </label>
      <FaTrashAlt
        className="delete-btn mr-3"
        onClick={() => deleteHandler(id)}
      />
      <FaPencilAlt className="edit-btn" onClick={() => editHandler(id)} />
    </li>
  );
};

export default ListItem;
