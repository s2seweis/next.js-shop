import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from '../../redux/slices/profileSlice';
import styles from '../../styles/scss/components/profile/Profile.module.scss';
import Loader from '../Loader/Loader'; // Import the Loader component

const ProfileComponent = ({ userId }) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.userProfile);
  const status = useSelector((state) => state.profile.status);
  const error = useSelector((state) => state.profile.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserProfile(userId));
    }
  }, [dispatch, status, userId]); // Dispatch only when status or userId changes

  if (status === 'loading' || !userProfile) { // Render Loader while loading or userProfile is empty
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <h1>User Profile</h1>
      <div className={styles.profileInfo}>
        <p><strong>Id:</strong> {userProfile.userId}</p>
        <p><strong>Email:</strong> {userProfile.bio}</p>
        <p><strong>Address:</strong> {userProfile.location}</p>
      </div>
    </div>
  );
};

export default ProfileComponent;
