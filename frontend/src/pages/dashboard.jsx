
import { useState, useEffect } from 'react';
import NoteForm from '../components/noteForm';
import NoteCard from '../components/noteCard';
import axiosInstance from '../api/axion';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  const categories = ['All', 'General', 'Work', 'Personal', 'Ideas', 'Todo'];

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
    const user = localStorage.getItem('user');
    if (user) {
      setUserName(JSON.parse(user).name || 'User');
    }
  }, []);

  // Filter notes based on search and category
  useEffect(() => {
    let filtered = notes;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((note) => note.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredNotes(filtered);
  }, [notes, searchQuery, selectedCategory]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      // Replace with actual API endpoint when backend is ready
      const response = await axiosInstance.get('/notes');
      setNotes(response.data || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (noteData) => {
    try {
      if (editingNote) {
        await axiosInstance.put(`/notes/${editingNote.id}`, noteData);
        setEditingNote(null);
      } else {
        await axiosInstance.post('/notes', noteData);
      }
      fetchNotes();
      setShowForm(false);
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await axiosInstance.delete(`/notes/${id}`);
        fetchNotes();
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingNote(null);
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <span className="logo-icon">📝</span>
              <h1>MyNotes</h1>
            </div>
            <p className="greeting">Welcome back, {userName}!</p>
          </div>
          <button
            className="btn-logout"
            onClick={() => {
              localStorage.clear();
              window.location.href = '/login';
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Action Bar */}
        <div className="action-bar">
          <div className="search-container">
            <input
              type="text"
              placeholder="🔍 Search notes..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            className="btn-create"
            onClick={() => {
              setEditingNote(null);
              setShowForm(true);
            }}
          >
            <span className="btn-icon">✚</span> New Note
          </button>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Notes Grid */}
        <div className="notes-container">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading notes...</p>
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📌</div>
              <h3>
                {notes.length === 0 ? 'No notes yet' : 'No matching notes'}
              </h3>
              <p>
                {notes.length === 0
                  ? 'Create your first note to get started!'
                  : 'Try a different search or category.'}
              </p>
              {notes.length === 0 && (
                <button
                  className="btn-create-empty"
                  onClick={() => {
                    setEditingNote(null);
                    setShowForm(true);
                  }}
                >
                  Create First Note
                </button>
              )}
            </div>
          ) : (
            <div className="notes-grid">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={handleEditNote}
                  onDelete={handleDeleteNote}
                />
              ))}
            </div>
          )}
        </div>

        {/* Stats Footer */}
        <div className="dashboard-footer">
          <div className="stats">
            <div className="stat-item">
              <span className="stat-label">Total Notes</span>
              <span className="stat-value">{notes.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">This Month</span>
              <span className="stat-value">{notes.length}</span>
            </div>
          </div>
        </div>
      </main>

      {/* Note Form Modal */}
      {showForm && (
        <NoteForm
          onSubmit={handleAddNote}
          onClose={handleCloseForm}
          initialNote={editingNote}
        />
      )}
    </div>
  );
};

export default Dashboard;