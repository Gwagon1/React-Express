import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';

const RepoDetails = () => {
  const { username, repo } = useParams();
  const [repoDetails, setRepoDetails] = useState(null);
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error state for API call issues

  // Fetch repository data and commits on component mount
  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const repoResponse = await fetch(`/api/users/${username}/repos/${repo}`);
        if (!repoResponse.ok) throw new Error('Failed to fetch repository details');
        
        const repoData = await repoResponse.json();
        setRepoDetails(repoData);

        const commitsResponse = await fetch(`/api/users/${username}/repos/${repo}/commits`);
        if (!commitsResponse.ok) throw new Error('Failed to fetch commits');
        
        const commitsData = await commitsResponse.json();
        setCommits(commitsData);
        setLoading(false);
      } catch (error) {
        setError(error.message); // Set error message
        setLoading(false);
      }
    };

    fetchRepoData();
  }, [username, repo]);

  if (loading) return <Loading />; // Show loading indicator
  if (error) return <p style={{ color: 'red' }}>{error}</p>; // Show error message if there's an issue

  return (
    <div>
      <h2>{repoDetails.name}</h2>
      <p>Created on: {new Date(repoDetails.created_at).toLocaleDateString()}</p>
      <p>Last Commit: {new Date(repoDetails.pushed_at).toLocaleDateString()}</p>
      <h3>Commits</h3>
      <ul>
        {commits.map((commit) => (
          <li key={commit.sha}>{commit.commit.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default RepoDetails;
