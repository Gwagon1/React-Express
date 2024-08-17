import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading'; // Import the Loading component

const RepoDetails = () => {
  const { username, repo } = useParams(); // Get username and repo from route parameters
  const [repoDetails, setRepoDetails] = useState(null); // State to hold repository details
  const [commits, setCommits] = useState([]); // State to hold commits
  const [loading, setLoading] = useState(true); // State to manage loading status

  // Fetch repository data and commits on component mount
  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const repoResponse = await fetch(`/api/users/${username}/repos/${repo}`);
        const repoData = await repoResponse.json();
        setRepoDetails(repoData);

        const commitsResponse = await fetch(`/api/users/${username}/repos/${repo}/commits`);
        const commitsData = await commitsResponse.json();
        setCommits(commitsData);
        setLoading(false);
      } catch (error) {
        console.error(error); // Log errors
      }
    };

    fetchRepoData();
  }, [username, repo]);

  if (loading) return <Loading />; // Show loading indicator

  return (
    <div>
      <h2>{repoDetails.name}</h2> {/* Repository name */}
      <p>{repoDetails.description}</p> {/* Repository description */}
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

