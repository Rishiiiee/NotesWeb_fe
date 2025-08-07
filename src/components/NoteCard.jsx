import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NoteCard({ note, refreshNotes, onEdit }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await axios.delete(
        `${process.env.REACT_APP_BASEURL}/api/notes/delete/${note._id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        }
      );
      refreshNotes();
    } catch (err) {
      console.error("Error deleting note:", err.response?.data || err.message);
    }
  };

  const handleCardClick = () => {
    navigate(`/note/${note._id}`);
  };

  return (
    <Card className="shadow-sm" style={{ cursor: "pointer" }}>
      <div onClick={handleCardClick}>
        {note.notesImage && (
          <Card.Img
            variant="top"
            src={note.notesImage}
            alt="Note"
            style={{ height: "150px", objectFit: "cover" }}
          />
        )}
        <Card.Body>
          <Card.Title>{note.title}</Card.Title>
          <Card.Text className="text-truncate" style={{ maxHeight: "60px" }}>
            {note.content}
          </Card.Text>
        </Card.Body>
      </div>

      {/* Button actions: not part of the click handler */}
      <Card.Body className="pt-0">
        <div className="d-flex justify-content-between">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering card click
              onEdit(note);
            }}
          >
            Edit
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering card click
              handleDelete();
            }}
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
