import { useState, useEffect } from "react";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NotesForm from "./components/NotesForm";
import Search from "./components/Search";
import { apiRequest } from "./api/apiRequest";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [value, setValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editNoteId, setEditNoteId] = useState("");
  const [loading, setLoading] = useState(true);
  const API_URL = "http://localhost:3500/tasks";

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw Error("Unable to fetch tasks");
      }
      const data = await response.json();
      setNotes(data);
      setErrorMessage("");
    } catch (e) {
      setErrorMessage(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTasks();
  }, []);

  const checkHandler = async (id) => {
    const newNotes = notes.map((note) =>
      note.id === id ? { ...note, isChecked: !note.isChecked } : note
    );
    const findCheckNote = newNotes.filter((note) => note.id === id);
    const data = findCheckNote[0];
    const result = await apiRequest(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (result) setErrorMessage(result);
    setNotes(newNotes);
  };

  const deleteHandler = async (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    const result = await apiRequest(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result) setErrorMessage(result);
    setNotes(newNotes);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isEdit) {
      const updatedNotes = notes.map((note) => {
        if (note.id === editNoteId) {
          return { ...note, id: editNoteId, title: value };
        } else {
          return note;
        }
      });
      const editNote = updatedNotes.find((note) => note.id === editNoteId);
      const result = await apiRequest(`${API_URL}/${editNoteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editNote),
      });
      if (result) setErrorMessage(result);
      setNotes(updatedNotes);
      setValue("");
      setIsEdit(false);
    } else {
      const note = {
        id: new Date().getTime().toString(),
        title: value,
        isChecked: false,
      };
      if (value) {
        const newNotes = [...notes, note];
        const result = await apiRequest(`${API_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(note),
        });
        if (result) setErrorMessage(result);
        setNotes(newNotes);
        setValue("");
      } else {
        return;
      }
    }
  };

  const editHandler = (id) => {
    setIsEdit(true);
    const editNote = notes.find((note) => note.id === id);
    setEditNoteId(id);
    setValue(editNote.title);
  };

  return (
    <>
      <Header title="Task Saver" />
      <main className="container mt-4">
        <NotesForm
          value={value}
          setValue={setValue}
          submitHandler={submitHandler}
          isEdit={isEdit}
        />
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {loading && <p className="mt-3">Loading...</p>}
        {errorMessage && <p className="mt-3 text-danger">{errorMessage}</p>}
        {!loading && !errorMessage && (
          <Content
            notes={notes.filter((note) =>
              note.title.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            setValue={setValue}
            value={value}
            checkHandler={checkHandler}
            deleteHandler={deleteHandler}
            submitHandler={submitHandler}
            editHandler={editHandler}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
