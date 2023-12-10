import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverAPI } from "../api/server.api";

export const CreateAccount = () => {
  const [username, setUserName] = useState("");
  const [pass, setPass] = useState("");

  return (
    <>
      <style>
        {`
          :root {
              --main-bg-color: #1B1B1B;
              --lnk-color: #FF6600;
              --form-bg-color: #1B1B1B;
              --font-family: 'Roboto Slab', sans-serif;
          }

          html, body {
              background-color: var(--main-bg-color);
              height: 100%;
              font-family: var(--font-family);
              margin: 0;
              display: flex;
              align-items: center;
              justify-content: center;
          }

          .wrapper {
              padding: 0 10%;
              display: flex;
              flex-direction: column;
              align-items: center;
          }

          a {
              color: var(--lnk-color);
              text-decoration: none;
          }

          .bth {
              background-color: #FF6600;
              border: none;
              padding: 10px;
              cursor: pointer;
              color: white;
          }

          .create-account-form {
              max-width: 300px;
              margin: 20px;
              text-align: center;
          }

          .form-group {
              margin-bottom: 15px;
          }

          input {
              width: 100%;
              padding: 10px;
              box-sizing: border-box;
              margin-bottom: 10px;
              background-color: var(--form-bg-color);
              border: 1px solid #FF6600;
              color: white;
          }
        `}
      </style>
      <div className="wrapper">
        <h1 style={{ color: "white" }}>Create Account</h1>
        <div className="create-account-form">
          <form>
            <div className="form-group">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUserName(e.currentTarget.value)}
              />
            </div>
            <div className="form-group">
              <input type="email" id="email" name="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
                value={pass}
                onChange={(e) => setPass(e.currentTarget.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                className="bth"
                value="Create Account"
                onClick={async (e) => {
                  e.preventDefault();
                  try {
                    await serverAPI.registration(username, pass);
                    alert('you were successfully registred. Login now')
                  } catch (e) {
                    console.log(e);
                  }
                }}
              />
            </div>
          </form>
          <p>
            <a href="login.php">Already have an account? Log In</a>
          </p>
        </div>
      </div>
    </>
  );
};
