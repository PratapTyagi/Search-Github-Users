import React from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import loadingImage from "../images/loading.gif";
import { Context } from "../context/context";
const Dashboard = () => {
  const { isLoading } = React.useContext(Context);
  if (isLoading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img src={loadingImage} className="loading-img" alt="Loading image" />
      </main>
    );
  }
  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
