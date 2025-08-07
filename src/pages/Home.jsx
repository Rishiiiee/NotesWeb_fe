import { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import NoteCard from "../components/NoteCard";
import AddNotes from "../components/AddNotes";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(`${process.env.REACT_APP_BASEURL}/api/notes/getallNotes`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setNotes(res.data.notes || []);
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Error fetching notes:", err.response?.data || err.message);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddClick = () => {
    setEditingNote(null);
    setShowModal(true);
  };

  const handleEditClick = (note) => {
    setEditingNote(note);
    setShowModal(true);
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <Container>
        {!isLoggedIn ? (
          <div className="text-center">
            <h1 className="display-4 fw-bold">Welcome to NotesApp</h1>
            <p className="lead">Organize your thoughts with ease.</p>
            <Button variant="primary" size="lg" className="me-2" href="/login">
              Login
            </Button>
            <Button variant="outline-secondary" size="lg" href="/register">
              Register
            </Button>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Your Notes</h2>
              <Button variant="success" onClick={handleAddClick}>
                + Add Note
              </Button>
            </div>

            <Row>
              {notes.length > 0 ? (
                notes.map((note) => (
                  <Col md={3} className="mb-4" key={note._id}>
                    <NoteCard note={note} refreshNotes={fetchNotes} onEdit={handleEditClick} />
                  </Col>
                ))
              ) : (
                <p className="text-center text-muted w-100">
                  No notes found. Click <strong>"Add Note"</strong> to create one.
                </p>
              )}
            </Row>

            <AddNotes
              show={showModal}
              onHide={() => setShowModal(false)}
              refreshNotes={fetchNotes}
              existingNote={editingNote}
            />
          </>
        )}
      </Container>
    </div>
  );
}
