  import { useState, useEffect } from "react";
  import { Modal, Button, Form } from "react-bootstrap";
  import axios from "axios";

  export default function AddNotes({ show, onHide, refreshNotes, existingNote }) {
    const [note, setNote] = useState({
      title: "",
      content: "",
      notesImage: "",
    });

    useEffect(() => {
      if (existingNote) {
        setNote({
          title: existingNote.title,
          content: existingNote.content,
          notesImage: existingNote.notesImage || "",
        });
      } else {
        setNote({ title: "", content: "", notesImage: "" });
      }
    }, [existingNote, show]);

    const handleChange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Submitting note:", note)
      try {
        if (existingNote) {
          
          await axios.patch(
            `${process.env.REACT_APP_BASEURL}/api/notes/update/${existingNote._id}`,
            note,
            {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
              withCredentials: true,
            }
          );
        } else {
          await axios.post(
            `${process.env.REACT_APP_BASEURL}/api/notes/createNotes`,
            note,
            {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
              withCredentials: true,
            }
          );  
        }
        refreshNotes();
        onHide();
      } catch (err) {
        console.error("❌ Error saving note:", err.response?.data || err.message);
    alert(`Failed to save note: ${err.response?.data?.message || err.message}`);
      }
    };

    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>{existingNote ? "Edit Note" : "Add New Note"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={note.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="content"
                value={note.content}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="notesImage"
                value={note.notesImage}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit" variant="success" className="w-100">
              {existingNote ? "Update Note" : "Add Note"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
