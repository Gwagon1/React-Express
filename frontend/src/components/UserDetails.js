import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from './Loading.js'; 

const UserDetails = () => {
  const { username } = useParams(); // Get username from route parameters
  const [user, setUser] = useState(null); // State to hold user data
  const [repos, setRepos] = useState([]); // State to hold repositories
  const [loading, setLoading] = useState(true); // State to manage loading status

  // Fetch user data and repositories on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`/api/users/${username}`);
        const userData = await userResponse.json();
        setUser(userData);

        const reposResponse = await fetch(`/api/users/${username}/repos`);
        const reposData = await reposResponse.json();
        setRepos(reposData);
        setLoading(false);
      } catch (error) {
        console.error(error); // Log errors
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) return <Loading />; // Show loading indicator

  return (
    <div>
      <img src={user.avatar_url} alt={`${username}'s avatar`} /> {/* User avatar */}
      <h2>{user.name}</h2> {/* User name */}
      <p>{user.bio}</p> {/* User bio */}
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <Link to={`/user/${username}/repos/${repo.name}`}>{repo.name}</Link> {/* Link to repo details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetails;
