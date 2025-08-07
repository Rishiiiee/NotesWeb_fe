import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";

export default function NoteDetails() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASEURL}/api/notes/singlenote/${noteId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        });
        setNote(res.data.note);
      } catch (err) {
        console.error("Error fetching note:", err.response?.data || err.message);
      }
    };

    fetchNote();
  }, [noteId]);

  if (!note) {
    return <p className="text-center mt-5">Loading note...</p>;
  }

  return (
    <Container className="mt-5">
      <Button variant="secondary" className="mb-3" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <Card className="shadow-sm">
        {note.notesImage && (
          <Card.Img
            variant="top"
            src={note.notesImage}
            alt="Note"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        )}

        <Card.Body>
          <Card.Title>{note.title}</Card.Title>
          <Card.Text style={{ whiteSpace: "pre-line" }}>{note.content}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
