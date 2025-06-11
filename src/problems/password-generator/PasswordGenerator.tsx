import React from "react";
import "./PasswordGenerator.css";

function PasswordGenerator() {
  return (
    <div className="password-generator-container">
      <header>
        <div className="title">Password Generator</div>
        <div className="sub-title">Generate strong unique passwords</div>
      </header>
      <main className="body">
        <section className="generator-section">
          <div className="password">PASSWORD</div>
          <div className="action-buttons">
            <div className="copy-button">
              <button>Copy</button>
            </div>
            <div className="regenerate-button">
                <button>Regenerate</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PasswordGenerator;
