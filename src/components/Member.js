import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Member.css';
import Modal from './MemberModel';

// Define initialFormData outside the component function
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

const MemberForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

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

    if (!formData.name || !formData.phone || !formData.email || !formData.profilePicture) {
      alert('Please fill in all mandatory fields.');
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
      const res = await axios.post('http://localhost:5000/add-member', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(res.data);
      fetchMembers();
      setShowForm(false);
      setFormData(initialFormData); // Reset the form
      alert('Member uploaded successfully');
    } catch (err) {
      console.error('Error uploading images:', err.response ? err.response.data : err.message);
      alert('Error while uploading');
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/members');
      setMembers(res.data);
    } catch (err) {
      console.error('Error fetching members:', err.response ? err.response.data : err.message);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleCardClick = (member) => {
    setSelectedMember(member);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  return (
    <div className='member-bg'>
      <div className="member-container">
        <h1>MEMBERS OF TCEA</h1>
        <button className="btn btn-primary" onClick={toggleForm}>
          {showForm ? 'Close ' : 'ADD MEMBERS'}
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
                  pattern="\d{10}" // Ensures exactly 10 digits
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
                  maxLength="50"
                />
              </div>
              <div className="form-group">
                <label>City*</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
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
                    <img key={index} src={imgSrc} alt={`Additional Preview ${index + 1}`} className="additional-imagem" />
                  ))}
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-success">Upload</button>
          </form>
        )}
        <div className="member-grid">
          {members.map((member) => (
            <div key={member._id} className="member-card">
              <h2>{member.name}</h2>
              {member.profilePicture && (
                <img
                  src={`http://localhost:5000/uploads/${member.profilePicture}`}
                  alt="Profile"
                  className="profile-picture"
                />
              )}
              <button className="btn btn-info" onClick={() => handleCardClick(member)}>
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
      {selectedMember && (
        <Modal member={selectedMember} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default MemberForm;
