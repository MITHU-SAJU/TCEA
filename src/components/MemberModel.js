// MemberModel.js
import React from 'react';
import './MemberModel.css'; // Import your CSS for styling the modal

const MemberModel = ({ member, onClose }) => {
  if (!member) return null;

  const handleClose = (e) => {
    e.preventDefault();
    if (typeof onClose === 'function') {
      onClose();
    } else {
      console.error('onClose is not a function');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose}>X</button>
        <h2 className="modal-title">{member.name}</h2>
        {member.profilePicture && (
          <img
            src={`http://localhost:5000/uploads/${member.profilePicture}`}
            alt={`${member.name}`} // Updated alt text
            className="profile-picture"
          />
        )}
        <div className="modal-details">
          <p><strong>Email:</strong> {member.email}</p>
          <p><strong>Phone:</strong> {member.phone}</p>
          <p><strong>Company:</strong> {member.company}</p>
          <p><strong>Address:</strong> {member.address}</p>
          <p><strong>City:</strong> {member.city}</p>
        </div>
        {member.images && member.images.length > 0 && (
          <div className="modal-images">
            {member.images.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:5000/uploads/${img}`}
                alt={`Additional ${index + 1}`} // Updated alt text
                className="additional-image"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberModel;
