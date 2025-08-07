import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import NoteCard from "../components/NoteCard";
import AddNotes from "../components/AddNotes";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

const handleAddClick = () => {
  setEditingNote(null);
  setShowModal(true);
};

const handleEditClick = (note) => {
  setEditingNote(note);
  setShowModal(true);
};  

  const fetchNotes = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/notes/getallNotes`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        }
      );
      setNotes(res.data.notes );
    } catch (err) {
      console.error("Error fetching notes:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Container className="mt-4">
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
              <NoteCard note={note} onEdit={handleEditClick} refreshNotes={fetchNotes} />
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
    </Container>
  );
}
