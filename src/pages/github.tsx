// pages/GithubProfile.js

import { useEffect, useState } from 'react';
import styles from '../styles/scss/pages/Github.module.scss'
import IsAuthUser from '../components/IsAuth/isAuthUser';

const GithubProfile = () => {
  const userId = '58604870'; // Your GitHub user ID
  const [userData, setUserData] = useState(null);
  console.log('line:2', userData);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://api.github.com/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className={styles.githubContainer}>
      {userData ? (
        <div className={styles.githubContainerAlign}>
          <h1>{userData.login}</h1>
          <img
            src={userData.avatar_url}
            alt={userData.login}
            style={{ width: '100px', borderRadius: '50%' }}
          />
          <p>Name: {userData.name}</p>
          <p>Location: {userData.location}</p>
          <p>Followers: {userData.followers}</p>
          <p>Following: {userData.following}</p>
          <p>Public Repos: {userData.public_repos}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default IsAuthUser(GithubProfile);
