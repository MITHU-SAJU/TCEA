import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Supplier.css';
import Modal from './SupplierModel';

const initialFormData = {
  name: '',
  phone: '',
  email: '',
  company: '',
  address: '',
  city: '',
  profilePicture: null,
  profilePicturePreview: null,
  images: [],
  imageFiles: []
};

const SupplierForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [suppliers, setSuppliers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'profilePicture' && files.length > 0) {
      setFormData({
        ...formData,
        profilePicture: files[0],
        profilePicturePreview: URL.createObjectURL(files[0])
      });
    } else if (name === 'images') {
      const newImageFiles = Array.from(files);
      if (newImageFiles.length + formData.imageFiles.length > 5) {
        alert('You can only upload a maximum of 5 images.');
        return;
      }
      const newImages = newImageFiles.map(file => URL.createObjectURL(file));
      setFormData({
        ...formData,
        images: [...formData.images, ...newImages],
        imageFiles: [...formData.imageFiles, ...newImageFiles]
      });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!formData.profilePicture) {
      console.error('Profile picture is required');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('phone', formData.phone);
    data.append('email', formData.email);
    data.append('company', formData.company);
    data.append('address', formData.address);
    data.append('city', formData.city);
    data.append('profilePicture', formData.profilePicture);

    formData.imageFiles.forEach((image) => {
      data.append('images', image);
    });

    try {
      const res = await axios.post('http://localhost:5000/add-supplier', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(res.data);
      fetchSuppliers();
      setShowForm(false);
      setFormData(initialFormData); // Reset the form
      alert('Supplier uploaded successfully');
    } catch (err) {
      console.error('Error uploading images:', err.response ? err.response.data : err.message);
      alert('Error while uploading');
    }
  };

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/suppliers');
      setSuppliers(res.data);
    } catch (err) {
      console.error('Error fetching suppliers:', err.response ? err.response.data : err.message);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleCardClick = (supplier) => {
    setSelectedSupplier(supplier);
  };

  const handleCloseModal = () => {
    setSelectedSupplier(null);
  };

  return (
    <div className='supplier-bg'>
      <div className="supplier-container">
        <h1>SUPPLIERS OF TCEA</h1>
        <button className="btn btn-primary" onClick={toggleForm}>
          {showForm ? 'Close Form' : 'ADD SUPPLIERS'}
        </button>
        {showForm && (
          <form onSubmit={handleUpload} className="form-container">
            <div className="form-grid">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  maxLength="50"
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  maxLength="10"
                    pattern="\d{10}"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength="50"
                />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  maxLength="50"
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  maxLength="50"
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  maxLength="30"
                />
              </div>
              <div className="form-group">
                <label>Profile Picture</label>
                <input
                  type="file"
                  name="profilePicture"
                  onChange={handleFileChange}
                  accept="image/*"
                  required
                />
                {formData.profilePicturePreview && (
                  <img
                    src={formData.profilePicturePreview}
                    alt="Profile Preview"
                    className="profile-picture"
                  />
                )}
              </div>
              <div className="form-group">
                <label>Shop Images</label>
                <input
                  type="file"
                  name="images"
                  onChange={handleFileChange}
                  accept="image/*"
                  multiple
                />
                <div className="image-preview-container">
                  {formData.images.map((imgSrc, index) => (
                    <img key={index} src={imgSrc} alt={`Additional Preview ${index + 1}`} className="additional-images" />
                  ))}
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-success">Upload</button>
          </form>
        )}
        <div className="supplier-grid">
          {suppliers.map((supplier) => (
            <div key={supplier._id} className="supplier-card">
              <h2>{supplier.name}</h2>
              {supplier.profilePicture && (
                <img
                  src={`http://localhost:5000/uploads/${supplier.profilePicture}`}
                  alt="Profile"
                  className="profile-picture"
                />
              )}
              <button className="btn btn-info" onClick={() => handleCardClick(supplier)}>
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
      {selectedSupplier && (
        <Modal supplier={selectedSupplier} closeModal={handleCloseModal} />
      )}
    </div>
  );
};

export default SupplierForm;
