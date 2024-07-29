import React from 'react';
import './SupplierModel.css';

const Modal = ({ supplier, closeModal }) => {
  if (!supplier) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={closeModal}>X</button>
        <div className="modal-header">
          <h2>{supplier.name}</h2>
          {supplier.profilePicture && (
            <img
              src={`http://localhost:5000/uploads/${supplier.profilePicture}`}
              alt={`${supplier.name}`} // Updated alt text
              className="profile-picture"
            />
          )}
        </div>
        <div className="modal-body">
          <p><strong>Email:</strong> {supplier.email}</p>
          <p><strong>Phone:</strong> {supplier.phone}</p>
          <p><strong>Company:</strong> {supplier.company}</p>
          <p><strong>Address:</strong> {supplier.address}</p>
          <p><strong>City:</strong> {supplier.city}</p>
        </div>
        {supplier.images.length > 0 && (
          <div className="modal-images">
           
            <div className="images-container">
              {supplier.images.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/uploads/${img}`}
                  alt={`Additional ${index + 1}`} // Updated alt text
                  className="additional-image"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
