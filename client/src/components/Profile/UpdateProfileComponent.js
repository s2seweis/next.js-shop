// UpdateProfileComponent.jsx

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile, updateUserProfile } from '../../redux/slices/profileSlice';
import styles from '../../styles/scss/components/profile/UpdateProfile.module.scss';
import Loader from '../Loader/Loader'; // Import the Loader component

const UpdateProfileComponent = ({ userId }) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.userProfile);
  console.log("line:1", userProfile);

  const status = useSelector((state) => state.profile.status);
  const error = useSelector((state) => state.profile.error);

  // State to manage form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
    imageUrl: '',
    // Add more fields as needed
  });
  console.log("line:2", formData);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserProfile(userId));
    }
  }, [dispatch, status, userId]); // Dispatch only when status or userId changes

  useEffect(() => {
    // Populate form data when userProfile changes
    if (userProfile) {
      setFormData({
        username: userProfile.username,
        email: userProfile.email,
        role: userProfile.role,
        imageUrl: userProfile.profilePictureUrl || '',
        // Add more fields as needed
      });
    }
  }, [userProfile]);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch action to update user profile
    dispatch(updateUserProfile({ userId, formData }));
  };

  if (status === 'loading' || !userProfile) {
    // Render Loader while loading or userProfile is empty
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <h1>Update Profile</h1>
      <div className={styles.profileInfo}>
      <div className={styles.imgContainer}>
          <div className={styles.imgTitle}>
            <strong>Profile Image:</strong>
          </div>
          <br />
          <div className={styles.roundImageContainer}>
            <img src={userProfile.profilePictureUrl} alt="Profile Image" />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Name:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
            />
          </div>
          {/* Add more input fields for other profile attributes */}
        </form>
      </div>

      <div className={styles.buttonContainer}>
      <button className={styles.button} type="submit">Update</button>
      </div>
    
    </div>
  );
};

export default UpdateProfileComponent;
