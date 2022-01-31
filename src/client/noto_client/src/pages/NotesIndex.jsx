import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import NotesList from "../components/NotesList";
import ResponsiveNav from "../components/ResponsiveNav";

const NotesIndex = () => {
  const initialNotes = [];

  const [notes, setNotes] = useState(initialNotes);

  const addNotes = (note) => {
    setNotes([note, ...notes]);
  };

  console.log("notes", notes);

  useEffect(() => {
    fetch("api/notes", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((notes) => setNotes(notes))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <NotesList notes={notes} />
      <Link to="/new" addNotes={addNotes}>New Note</Link>
      <ResponsiveNav>
        <NotesList notes={notes} />
        <Link to="/new">New Note</Link>
      </ResponsiveNav>
    </div>
  );
};

export default NotesIndex;
