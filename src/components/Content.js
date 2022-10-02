import React from "react";
import List from "./List";

const Content = ({ notes, checkHandler, deleteHandler, editHandler }) => {
  return (
    <List
      notes={notes}
      checkHandler={checkHandler}
      deleteHandler={deleteHandler}
      editHandler={editHandler}
    />
  );
};

export default Content;
