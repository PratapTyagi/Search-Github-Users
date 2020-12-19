import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import loginImg from "../images/gitHubUser.png";
const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Wrapper>
      <div>
        <img src={loginImg} alt="GitHubUserImage" />
        <h2>Github User</h2>
        <button type="submit" className="btn" onClick={loginWithRedirect}>
          LOGIN/SIGN UP
        </button>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  text-align: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
    width: 20vw;
    height: 20vw;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
`;
export default Login;
