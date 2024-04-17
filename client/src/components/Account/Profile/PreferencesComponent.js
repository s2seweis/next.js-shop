import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPreference, updateUserPreference } from '../../../redux/slices/userPreferencSlice';
import styles from '../../../styles/scss/components/account/UpdateProfile.module.scss';
import Loader from '../../Loader/Loader'; // Import the Loader component
import { notification } from 'antd'; // Import notification component from Ant Design
import Select from 'react-select';

const PreferenceComponent = ({ userId }) => {
  const dispatch = useDispatch();
  const userPreference = useSelector((state) => state.preference.userPreference);
  console.log("line:1", userPreference);

  const status = useSelector((state) => state.profile.status);
  const error = useSelector((state) => state.profile.error);

  // State to manage form data
  const [formData, setFormData] = useState({
    language: '',
    preferencesId: null,
    receive_email_notifications: false,
    show_online_status: false,
    theme: '',
    userId: null,
  });

  console.log("line:2", formData);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserPreference(userId));
    }
  }, [dispatch, status, userId]); // Dispatch only when status or userId changes

  useEffect(() => {
    // Populate form data when userPreference changes
    if (userPreference) {
      setFormData({
        language: userPreference.language || '',
        preferencesId: userPreference.preferencesId || null,
        receive_email_notifications: userPreference.receiveEmailNotifications || false,
        show_online_status: userPreference.showOnlineStatus || false,
        theme: userPreference.theme || '',
        userId: userPreference.userId || null,
      });
    }
  }, [userPreference]);

  // Function to handle form input changes for select fields
  const handleSelectChange = (fieldName, selectedOption) => {
    setFormData({
      ...formData,
      [fieldName]: selectedOption.value,
    });
  };

  // Function to handle form input changes for checkboxes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch action to update user profile
    await dispatch(updateUserPreference({ userId, formData }));
    // Display notification if update was successful
    notification.success({
      message: 'Update Successful',
      description: 'Your profile has been updated successfully.',
      duration: 3, // Notification duration in seconds
    });
  };

  if (status === 'loading' || !userPreference) {
    // Render Loader while loading or userPreference is empty
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  // Options for language select
  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    // Add more languages if needed
  ];

  // Options for theme select
  const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ];

  return (
    <div className={styles.profileContainer}>
      <h1>Update Preference</h1>
      <div className={styles.profileInfo}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="language">Language:</label>
            <Select
              id="language"
              name="language"
              options={languageOptions}
              value={languageOptions.find(option => option.value === formData.language)}
              onChange={(selectedOption) => handleSelectChange('language', selectedOption)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="theme">Theme:</label>
            <Select
              id="theme"
              name="theme"
              options={themeOptions}
              value={themeOptions.find(option => option.value === formData.theme)}
              onChange={(selectedOption) => handleSelectChange('theme', selectedOption)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="receiveEmailNotifications">Receive Email Notifications:</label>
            <input
              type="checkbox"
              id="receiveEmailNotifications"
              name="receiveEmailNotifications"
              checked={formData.receiveEmailNotifications}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="showOnlineStatus">Show Online Status:</label>
            <input
              type="checkbox"
              id="showOnlineStatus"
              name="showOnlineStatus"
              checked={formData.showOnlineStatus}
              onChange={handleCheckboxChange}
            />
          </div>
          {/* Add more input fields for other preferences if needed */}
          <div className={styles.buttonContainer}>
            <button className={styles.button} type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreferenceComponent;
