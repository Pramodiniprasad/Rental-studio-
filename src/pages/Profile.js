// src/pages/Profile.js
import React, { useState, useEffect } from "react";
import "./Profile.css";
import { FiTrash2 } from "react-icons/fi";

function Profile() {
  const [profileData, setProfileData] = useState({
    organizationName: "",
    ownerName: "",
    description: "",
    address: "",
  });

  const [notes, setNotes] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  // Simulate fetching data from API (replace with real API later)
  useEffect(() => {
    async function fetchProfile() {
      const response = {
        organizationName: "organizationName",
        ownerName: "ownerName",
        description: "description",
        address: "address",
      };
      setProfileData(response);
    }

    fetchProfile();
  }, []);

  // Add note
  const handleAddNote = () => {
    setNotes([...notes, ""]);
  };

  // Handle note input change
  const handleNoteChange = (index, value) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = value;
    setNotes(updatedNotes);
  };

  // Confirm before delete
  const confirmDeleteNote = (index) => {
    setNoteToDelete(index);
    setShowConfirm(true);
  };

  // Delete note after confirmation
  const handleDeleteNote = () => {
    if (noteToDelete !== null) {
      const updatedNotes = [...notes];
      updatedNotes.splice(noteToDelete, 1);
      setNotes(updatedNotes);
      setNoteToDelete(null);
      setShowConfirm(false);
    }
  };

  return (
    <div className="profile-page">
      <h2>Organization Details</h2>

      <div className="org-details-card">
        <div className="org-left">
          <div className="image-upload">
            <div className="image-placeholder">
              <span>No image</span>
              <input type="file" id="imageUpload" hidden />
              <label htmlFor="imageUpload" className="camera-icon">📷</label>
            </div>
          </div>
        </div>

        <div className="org-right">
          <div className="form-group">
            <label>Organization Name</label>
            <input type="text" value={profileData.organizationName} readOnly />
          </div>
          <div className="form-group">
            <label>Owner Name</label>
            <input type="text" value={profileData.ownerName} readOnly />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input type="text" value={profileData.description} readOnly />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" value={profileData.address} readOnly />
          </div>
          <button className="save-btn">Save</button>
        </div>
      </div>

      <div className="notes-section">
        <h3>Special Notes</h3>

        {notes.length === 0 ? (
          <div className="notes-placeholder">
            <img src="/no-notes.png" alt="No notes" />
            <p>There is no any notes found!</p>
          </div>
        ) : (
          notes.map((note, index) => (
            <div key={index} className="note-item">
              <input
                type="text"
                placeholder="Enter note"
                value={note}
                onChange={(e) => handleNoteChange(index, e.target.value)}
              />
              <span className="delete-icon" onClick={() => confirmDeleteNote(index)}>
                <FiTrash2 />
              </span>
            </div>
          ))
        )}

        <button className="add-notes-btn" onClick={handleAddNote}>
          + Add New Notes
        </button>

        {/* Confirmation Modal */}
        {showConfirm && (
          <div className="confirm-modal">
            <div className="modal-content">
              <h3>Confirm Notes Deletion?</h3>
              <p>Are you sure you want to delete this note?</p>
              <p><strong>This action cannot be undone.</strong></p>
              <div className="modal-buttons">
                <button className="delete-btn" onClick={handleDeleteNote}>
                  Yes, Delete
                </button>
                <button className="cancel-btn" onClick={() => setShowConfirm(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
