import React, { useEffect, useState } from "react";
import "./PasswordGenerator.css";

function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);

  useEffect(() => {
    generatePassword()
  }, [passwordLength])

  const generatePassword = () => {
    const length = passwordLength
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
  };

  const onPasswordLengthChange = (length: number) => {
    setPasswordLength(length)
  }

  return (
    <div className="password-generator-container">
      <header>
        <div className="title">Password Generator</div>
        <div className="sub-title">Generate strong unique passwords</div>
      </header>
      <main className="body">
        <section className="generator-section">
          <div className="password">{password || "Generate Password"}</div>
          <div className="action-buttons">
            <div className="copy-button">
              <button onClick={copyPassword}>Copy</button>
            </div>
            <div className="regenerate-button">
              <button onClick={() => generatePassword()}>Regenerate</button>
            </div>
          </div>
        </section>
        <section className="password-length">
          <div className="up">
            <div className="title">Password length</div>
            <div className="length">{passwordLength}</div>
          </div>
          <div className="down">
            <input type="range" max={18} min={4} onChange={(e) => onPasswordLengthChange(parseInt(e.target.value))} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default PasswordGenerator;
