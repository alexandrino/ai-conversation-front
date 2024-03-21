import React, { useState, useEffect } from "react";

import ButtonIcon from "./ButtonIcon";

import "./index.css";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);

  const getConversation = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          profile_id: "1",
        },
        body: JSON.stringify({ message: inputValue }),
      });
      const data = await res.json();
      setMessages(data);
      setIsLoading(false);
      setInputValue("");
    } catch (error) {
      setError("Something went wrong!");
      console.error("Error fetching conversation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(function () {
    getConversation();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await getConversation();
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="app">
      {!error && <ChatComponent messages={messages} />}
      {error && <ErrorComponent error={error} />}
      <FormComponent
        inputValue={inputValue}
        onHandleFormSubmit={handleFormSubmit}
        onHandleInputChange={handleInputChange}
      />
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

const ErrorComponent = ({ error }) => {
  return <div>{error}</div>;
};

const ChatItemComponent = ({ role, message }) => {
  return (
    <div>
      <p className="font-semibold">{role === "user" ? "You" : "ChatGPT"}</p>
      <p>{message}</p>
    </div>
  );
};

const ChatComponent = ({ messages }) => {
  return (
    <ul className="messages">
      {messages.map(({ role, content }, index) => (
        <li key={index}>
          {content && <ChatItemComponent role={role} message={content} />}
        </li>
      ))}
    </ul>
  );
};

const FormComponent = ({
  inputValue,
  onHandleFormSubmit,
  onHandleInputChange,
}) => {
  return (
    <form onSubmit={onHandleFormSubmit}>
      <div className="text-input">
        <textarea
          value={inputValue}
          onChange={onHandleInputChange}
          id="message"
          label="Message ChatGTP"
        />
        <button>
          <ButtonIcon />
        </button>
      </div>
    </form>
  );
};

export default App;
