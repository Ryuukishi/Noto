import React, { useState } from "react";
import { useContext } from "react";
import Context from "../context/context";
import VisibilityButton from "./VisibilityButton";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

function Note(props) {
  const { setNotes, resetNotes, joins } = useContext(Context);
  const { title, description, code, isPublic, noteId, tags, deleteNote } =
    props;
  const [visibility, setVisibility] = useState(isPublic);

  const noteJoins = [];
  joins.forEach((join) => {
    if (join.note_id === noteId) {
      noteJoins.push(join);
    }
  });
  console.log("notejoins", noteJoins);

  const onDeleteNote = async (event) => {
    event.preventDefault();
    deleteNote(noteId);
    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    await fetch(`/api/notes/${noteId}`, options);
    const newNotes = await resetNotes();
    setNotes(newNotes);
  };

  const onEditNote = async (event) => {
    event.prevent.preventDefault();
  };

  const toggleVisibility = async (event) => {
    setVisibility(!visibility);
    const options = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: noteId,
        title: title,
        description: description,
        code: code,
        public: visibility,
      }),
    };

    await fetch(`/api/notes/${noteId}`, options);
    const newNotes = await resetNotes();
    setNotes(newNotes);
  };

  return (
    <div>
      <ul>
        <li>Title: {title}</li>
        <li>Description: {description}</li>
        <li>
          Example: <code>{code}</code>
        </li>
        <EditButton onEditNote={onEditNote} />
        <DeleteButton onDeleteNote={onDeleteNote} />
        {/* toggleVisibility={}
					sx={{}} */}
        <VisibilityButton
          isPublic={visibility}
          toggleVisibility={toggleVisibility}
        />
        {/* <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          {tags.map((tag, index) => (
            <Button key={index}>{tag.title}</Button>
          ))}
        </ButtonGroup> */}
      </ul>
    </div>
  );
}

export default Note;
