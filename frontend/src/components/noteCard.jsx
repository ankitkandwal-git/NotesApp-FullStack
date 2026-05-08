import '../styles/noteCard.css';

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
        <p>{truncateText(note.content, 100)}</p>
      </div>

      <div className="note-footer">
        <span className="note-category">{note.category || 'General'}</span>
        <span className="note-date">{formatDate(note.createdAt)}</span>
      </div>
    </div>
  );
};

export default NoteCard;
