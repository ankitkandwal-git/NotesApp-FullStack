const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

// Get all notes for a user
router.get('/', (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  db.all(
    'SELECT * FROM notes WHERE user_id = ? ORDER BY updated_at DESC',
    [userId],
    (err, notes) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching notes', error: err });
      }
      res.json(notes || []);
    }
  );
});

// Get a single note
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  db.get(
    'SELECT * FROM notes WHERE id = ? AND user_id = ?',
    [id, userId],
    (err, note) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching note', error: err });
      }
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.json(note);
    }
  );
});

// Create a new note
router.post('/', (req, res) => {
  const { title, content, category = 'General', color = '#FFE5B4' } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  db.run(
    'INSERT INTO notes (user_id, title, content, category, color) VALUES (?, ?, ?, ?, ?)',
    [userId, title, content, category, color],
    function (err) {
      if (err) {
        return res.status(500).json({ message: 'Error creating note', error: err });
      }
      res.status(201).json({
        id: this.lastID,
        user_id: userId,
        title,
        content,
        category,
        color,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
  );
});

// Update a note
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, category, color } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  db.run(
    'UPDATE notes SET title = ?, content = ?, category = ?, color = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
    [title, content, category, color, id, userId],
    function (err) {
      if (err) {
        return res.status(500).json({ message: 'Error updating note', error: err });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.json({ message: 'Note updated successfully', id: parseInt(id) });
    }
  );
});

// Delete a note
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  db.run('DELETE FROM notes WHERE id = ? AND user_id = ?', [id, userId], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Error deleting note', error: err });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note deleted successfully' });
  });
});

module.exports = router;
