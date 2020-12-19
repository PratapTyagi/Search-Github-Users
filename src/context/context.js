import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const Context = React.createContext();

const ContextProvider = ({ children }) => {
  const [gitHubUser, setGitHubUser] = useState(mockUser);
  const [repositories, setRepositories] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Errors
  const [errors, setErrors] = useState({ show: false, msg: "" });

  // Search GitHub User
  const searchGitHubUser = async (user) => {
    toggleErrors();
    // Loading spinner
    setIsLoading(true);
    // Fetch user from api
    const response = await axios
      .get(`${rootUrl}/users/${user}`)
      .catch((err) => {
        console.log(err);
      });
    if (response) {
      setGitHubUser(response.data);
      const { login, followers_url, repos_url } = response.data;

      // All data will fetched at a time only until then loading goes on
      await Promise.allSettled([
        axios.get(`${repos_url}?per_page=100`),
        axios.get(`${followers_url}?per_page=100`),
      ])
        .then((res) => {
          const [repos, followers] = res;
          const status = "fulfilled";

          if (repos.status === status) {
            setRepositories(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((err) => console.log(err));
    } else toggleErrors(true, "Searched User doesn't exists.");

    checkReq();
    setIsLoading(false);
  };

  // Checking requests no
  const checkReq = () => {
    axios
      .get(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining == 0)
          toggleErrors(true, "Sorry you used all of your hourly requests.");
      })
      .catch((err) => console.log(err));
  };

  // Toggle Errors
  const toggleErrors = (show = false, msg = "") => {
    setErrors({ show, msg });
  };

  useEffect(checkReq, []);

  return (
    <Context.Provider
      value={{
        gitHubUser,
        repositories,
        followers,
        requests,
        errors,
        searchGitHubUser,
        isLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider, Context };
