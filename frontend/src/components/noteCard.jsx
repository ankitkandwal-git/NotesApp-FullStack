
import '../styles/noteCard.css';

// Map project names to URLs
const projectLinks = {
  NotesApp: "https://notesapp-fullstack-qvwo.onrender.com",
  // Add more projects here if needed
};

// Function to auto-link project names in text
function autoLinkProjects(text) {
  // Add more project names to the regex if needed
  return text.split(/(NotesApp)/g).map((part, i) =>
    projectLinks[part] ? (
      <a
        key={i}
        href={projectLinks[part]}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#6c63ff", textDecoration: "underline" }}
      >
        {part}
      </a>
    ) : (
      part
    )
  );
}

const NoteCard = ({ note, onEdit, onDelete }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div
      className="note-card"
      style={{ backgroundColor: note.color || '#FFE5B4' }}
    >
      <div className="note-card-header">
        <h3 className="note-title">{truncateText(note.title, 30)}</h3>
        <div className="note-actions">
          <button
            className="btn-action btn-edit"
            onClick={() => onEdit(note)}
            title="Edit"
          >
            ✎
          </button>
          <button
            className="btn-action btn-delete"
            onClick={() => onDelete(note.id)}
            title="Delete"
          >
            🗑
          </button>
        </div>
      </div>

      <div className="note-content">
        <p>{autoLinkProjects(truncateText(note.content, 100))}</p>
      </div>

      <div className="note-footer">
        <span className="note-category">{note.category || 'General'}</span>
        <span className="note-date">{formatDate(note.createdAt)}</span>
      </div>
    </div>
  );
};

export default NoteCard;
