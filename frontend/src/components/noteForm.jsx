import { useState, useEffect } from 'react';
import '../styles/noteForm.css';

const NoteForm = ({ onSubmit, onClose, initialNote = null }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [color, setColor] = useState('#FFE5B4');

  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title || '');
      setContent(initialNote.content || '');
      setCategory(initialNote.category || 'General');
      setColor(initialNote.color || '#FFE5B4');
    }
  }, [initialNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit({ title, content, category, color });
      setTitle('');
      setContent('');
      setCategory('General');
      setColor('#FFE5B4');
    }
  };

  const colors = ['#FFE5B4', '#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA', '#E0BBE4', '#D5AAFF'];

  return (
    <div className="note-form-backdrop" onClick={onClose}>
      <div className="note-form-container" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h2>{initialNote ? 'Edit Note' : 'Create New Note'}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input title-input"
              required
            />
          </div>

          <div className="form-group">
            <textarea
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="form-textarea"
              rows="8"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-select"
              >
                <option>General</option>
                <option>Work</option>
                <option>Personal</option>
                <option>Ideas</option>
                <option>Todo</option>
              </select>
            </div>

            <div className="form-group">
              <label>Color</label>
              <div className="color-picker">
                {colors.map((col) => (
                  <div
                    key={col}
                    className={`color-option ${color === col ? 'active' : ''}`}
                    style={{ backgroundColor: col }}
                    onClick={() => setColor(col)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {initialNote ? 'Update Note' : 'Create Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
