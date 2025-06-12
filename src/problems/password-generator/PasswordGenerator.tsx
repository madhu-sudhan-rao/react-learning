import React, { useState } from "react";
import "./PasswordGenerator.css";

function PasswordGenerator() {
  const [password, setPassword] = useState("");

  const generatePassword = (length = 12) => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const number = "0123456789";
    const symbol = "!@#$%^&*()_+{}[]<>?/|";

    const getRandom = (set: string) =>
      set[Math.floor(Math.random() * set.length)];

    let pwd = [
      getRandom(upper),
      getRandom(lower),
      getRandom(number),
      getRandom(symbol),
    ];

    const allChars = upper + lower + number + symbol;

    while (pwd.length < length) {
      pwd.push(getRandom(allChars));
    }

    setPassword(pwd.sort(() => Math.random() - 0.5).join(""));
  };


  const copyPassword = () => {
    navigator.clipboard.writeText(password);
  }

  return (
    <div className="password-generator-container">
      <header>
        <div className="title">Password Generator</div>
        <div className="sub-title">Generate strong unique passwords</div>
      </header>
      <main className="body">
        <section className="generator-section">
          <div className="password">{password || 'Generate Password'}</div>
          <div className="action-buttons">
            <div className="copy-button">
              <button onClick={copyPassword}>Copy</button>
            </div>
            <div className="regenerate-button">
              <button onClick={() => generatePassword()}>Regenerate</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PasswordGenerator;
