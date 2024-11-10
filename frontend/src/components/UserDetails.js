import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';

const UserDetails = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error state for API call issues

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${username}`);
        if (!response.ok) throw new Error('User not found'); // Set error if fetch fails

        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        setError('Could not fetch user details'); // Update error state
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) return <Loading />;

  if (error) return <p style={{ color: 'red' }}>{error}</p>; // Display error message

  return (
    <div>
      <h2>{userData.name}</h2>
      <p>{userData.bio}</p>
      <p>Location: {userData.location}</p>
      <p>Public Repos: {userData.public_repos}</p>
    </div>
  );
};

export default UserDetails;
