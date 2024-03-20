// import { useEffect, useState } from 'react';

// const UserProfile = () => {
//   const [userData, setUserData] = useState(null);
//   const userId = '58604870'; // GitHub user ID

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(`https://api.github.com/users/${userId}`);
//         if (response.ok) {
//           const data = await response.json();
//           setUserData(data);
//         } else {
//           console.error('Failed to fetch user data:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   return (
//     <div>
//       {userData ? (
//         <div>
//           <h2>{userData.name}</h2>
//           <p>{userData.bio}</p>
//           <p>Followers: {userData.followers}</p>
//           <p>Following: {userData.following}</p>
//           {/* Add more profile data as needed */}
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default UserProfile;
