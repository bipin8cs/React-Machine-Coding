import React, { useState, useEffect } from 'react';
import './FetchingGithupRepos.css';

function FetchingGithupRepos() {
  const [userName, setUserName] = useState('');
  const [includeFork, setIncludefork] = useState(false);
  const [userRepoData, setuserRepoData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    try {
      if (isSubmitted || includeFork) {
        const API_USER_URL = `https://api.github.com/users/${userName}/repos`;

        fetch(API_USER_URL)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`GitHub API error: ${res.status}`);
            }
            return res.json();
          })
          .then((fetechedData) => {
            console.log('is', includeFork);
            fetechedData = fetechedData.sort((a, b) => b.size - a.size);
            setuserRepoData(fetechedData);
            console.log('Public repos:', repos);
            // You can now use repos in your app (e.g., setuserRepoData(repos))
          })
          .catch((err) => {
            console.error('Fetch error:', err.message);
          });
      }
    } catch (e) {
      console.log(e);
    }
    return () => {};
  }, [userName, isSubmitted]);

  return (
    <div className="App">
      <div className="input">
        <label htmlFor="username">Github username: </label>
        <input
          id="username"
          type="text"
          onChange={(e) => {
            setuserRepoData([]);
            setIsSubmitted(false);
            setUserName(e.target.value);
          }}
        />
        <label htmlFor="fork">Include forks: </label>
        <input
          disabled={!userName}
          id="fork"
          type="checkbox"
          onChange={() => {
            setIsSubmitted(false);
            setIncludefork(!includeFork);
          }}
        />
        <button
          disabled={!userName}
          onClick={() => {
            setIsSubmitted(true);
          }}
        >
          Submit
        </button>
      </div>
      <section>
        <header>
          <div className="col">Name</div>
          <div className="col">Language</div>
          <div className="col">Description</div>
          <div className="col">Size</div>
        </header>
        {userName && userRepoData.length !== 0 && includeFork
          ? userRepoData.map((e) => {
              return (
                <div>
                  <div className="col">{e?.name}</div>
                  <div className="col">{e?.language}</div>
                  <div className="col">{e?.description}</div>
                  <div className="col">{e.size}</div>
                </div>
              );
            })
          : userName &&
            userRepoData
              .filter((e) => !e?.fork)
              .map((e) => {
                return (
                  <div>
                    <div className="col">{e?.name}</div>
                    <div className="col">{e?.language}</div>
                    <div className="col">{e?.description}</div>
                    <div className="col">{e.size}</div>
                  </div>
                );
              })}
      </section>
      {userName && userRepoData?.length === 0 && (
        <div className="error">Not Found</div>
      )}
    </div>
  );
}

export default FetchingGithupRepos;
