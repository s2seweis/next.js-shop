import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPreference, updateUserPreference } from '../../../redux/slices/userPreferenceSlice';
import styles from '@/src/styles/scss/components/account/UpdateProfile.module.scss';
import Loader from '@/src/components/Loader/Loader'; // Import the Loader component
import { notification } from 'antd'; // Import notification component from Ant Design
import Select from 'react-select';

const PreferenceComponent = ({ userId }) => {
  const dispatch = useDispatch();
  const userPreference = useSelector((state) => state.preference.userPreference);
  console.log("line:700", userPreference);
  
  const status = useSelector((state) => state.preference.status);
  const error = useSelector((state) => state.preference.error);
  
  // State to manage form data
  const [formData, setFormData] = useState({
    language: '',
    preferencesId: null,
    receive_email_notifications: false, // Changed key to camelCase
    show_online_status: false, // Changed key to camelCase
    theme: '',
    userId: null,
  });
  console.log("line:800", userPreference);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserPreference(userId));
    }
  }, [dispatch, status, userId]);

  useEffect(() => {
    if (userPreference) {
      setFormData({
        language: userPreference.language || '',
        preferencesId: userPreference.preferencesId || null,
        receive_email_notifications: userPreference.receiveEmailNotifications || false, // Changed key to match state key
        show_online_status: userPreference.showOnlineStatus || false, // Changed key to match state key
        theme: userPreference.theme || '',
        userId: userPreference.userId || null,
      });
    }
  }, [userPreference]);

  const handleSelectChange = (fieldName, selectedOption) => {
    setFormData({
      ...formData,
      [fieldName]: selectedOption.value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateUserPreference({ userId, formData }));
    notification.success({
      message: 'Update Successful',
      description: 'Your profile has been updated successfully.',
      duration: 3,
    });
  };

  if (status === 'loading' || !userPreference) {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
  ];

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
            <label htmlFor="receive_email_notifications">Receive Email Notifications:</label>
            <input
              type="checkbox"
              id="receive_email_notifications"
              name="receive_email_notifications"
              checked={formData.receive_email_notifications}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="show_online_status">Show Online Status:</label>
            <input
              type="checkbox"
              id="show_online_status"
              name="show_online_status"
              checked={formData.show_online_status}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.button} type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreferenceComponent;
