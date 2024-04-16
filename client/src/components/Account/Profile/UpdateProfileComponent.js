import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile, updateUserProfile } from '../../../redux/slices/profileSlice';
import styles from '../../../styles/scss/components/account/UpdateProfile.module.scss';
import Loader from '../../Loader/Loader'; // Import the Loader component
import Select from 'react-select';
import { notification } from 'antd'; // Import notification component from Ant Design

const UpdateProfileComponent = ({ userId }) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.userProfile);
  console.log("line:1", userProfile);

  const status = useSelector((state) => state.profile.status);
  const error = useSelector((state) => state.profile.error);

  // State to manage form data
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
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
        full_name: userProfile.fullName,
        email: userProfile.email,
        role: userProfile.role,
        profile_picture_url: userProfile.profilePictureUrl || '',
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

  // Function to handle role selection change
  const handleRoleChange = (selectedOption) => {
    setFormData({
      ...formData,
      role: selectedOption.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch action to update user profile
    await dispatch(updateUserProfile({ userId, formData }));
    // Display notification if update was successful
    notification.success({
      message: 'Update Successful',
      description: 'Your profile has been updated successfully.',
      duration: 3, // Notification duration in seconds
    });
  };

  if (status === 'loading' || !userProfile) {
    // Render Loader while loading or userProfile is empty
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  // Define options for role select
  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' }
  ];

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
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="full_name">Full Name:</label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
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
            <Select
              id="role"
              name="role"
              options={roleOptions}
              value={roleOptions.find(option => option.value === formData.role)}
              onChange={handleRoleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="profile_picture_url">Image URL:</label>
            <input
              type="text"
              id="profile_picture_url"
              name="profile_picture_url"
              value={formData.profile_picture_url}
              onChange={handleInputChange}
            />
          </div>
          {/* Add more input fields for other profile attributes */}
          <div className={styles.buttonContainer}>
            <button className={styles.button} type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileComponent;
