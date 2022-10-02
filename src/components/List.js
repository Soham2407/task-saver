import React from "react";
import ListItem from "./ListItem";

const List = ({ notes, checkHandler, deleteHandler, editHandler }) => {
  return (
    <section className="mt-4 items-section">
      {notes.length ? (
        <ul>
          {notes.map((note) => (
            <ListItem
              note={note}
              key={note.id}
              checkHandler={checkHandler}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
            />
          ))}
        </ul>
      ) : (
        <p>No Notes Found 😮</p>
      )}
    </section>
  );
};

export default List;
