// ChangePasswordComponent.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPassword, updatePassword } from '@/src/redux/slices/passwordSlice';
import styles from '@/src/styles/scss/components/account/UpdateProfile.module.scss';
import Loader from '@/src/components/Loader/Loader'; // Import the Loader component
import { notification } from 'antd'; // Import notification component from Ant Design

const ChangePasswordComponent = ({ userId }) => {
  console.log("line:0", userId);
  const dispatch = useDispatch();
  const password = useSelector((state) => state.password.password); // Corrected state selection
  console.log("line:1", password);

  const status = useSelector((state) => state.password.status);
  const error = useSelector((state) => state.password.error);

  // State to manage form data
  const [formData, setFormData] = useState({
    userId: '',
    newPassword: '' // Adjusted field name
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPassword(userId));
    }
  }, [dispatch, status, userId]); // Dispatch only when status or userId changes

  useEffect(() => {
    if (password) {
      setFormData({
        userId: password.userId,
        newPassword: '' // Adjusted field name
      });
    }
  }, [password]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updatePassword({ userId, formData }));
    notification.success({
      message: 'Password Update Successful',
      description: 'Your Password has been updated successfully.',
      duration: 3,
    });
  };

  if (status === 'loading' || !password) {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <h1>Change Password</h1>
      <div className={styles.profileInfo}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="userId">UserId:</label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="newPassword">Password:</label>
            <input
              type="text"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
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

export default ChangePasswordComponent;
