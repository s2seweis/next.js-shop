// ProfileComponent.jsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from '../../redux/slices/profileSlice';
import styles from '../../styles/scss/components/profile/Profile.module.scss';
import Loader from '../Loader/Loader'; // Import the Loader component
import Link from 'next/link';

const ProfileComponent = ({ userId }) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.userProfile);
  // console.log("line:10", userProfile);

  const status = useSelector((state) => state.profile.status);
  const error = useSelector((state) => state.profile.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserProfile(userId));
    }
  }, [dispatch, status, userId]); // Dispatch only when status or userId changes

  if (status === 'loading' || !userProfile) {
    // Render Loader while loading or userProfile is empty
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <h1>User Profile</h1>
      <div className={styles.profileInfo}>
        <p>
          <strong>Id:</strong> {userProfile.userId}
        </p>
        <p>
          <strong>User Name:</strong> {userProfile.username}
        </p>
        <p>
          <strong>Full Name:</strong> {userProfile.fullName}
        </p>
        <p>
          <strong>E-Mail:</strong> {userProfile.email}
        </p>
        <p>
          <strong>Role:</strong> {userProfile.role}
        </p>
        <p>
          <div className={styles.imgTitle}>
            <strong>Profile Image:</strong>
          </div>
          <br></br>
        </p>
        <div className={styles.roundImageContainer}>
          <img src={userProfile.profilePictureUrl} alt="Profile Image" />
        </div>
      </div>

      <div className={styles.buttonContainer}>
      {/* <Link href="/profile/UpdateProfile">
        <button className={styles.button}>Go to Update</button>
      </Link> */}
    </div>

    </div>
  );
};

export default ProfileComponent;
