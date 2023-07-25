import "./App.css";
// import Input from "./components/Input/Input.js";
// import Output from "./components/Output/Output.js";

import env from "react-dotenv";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import Loader from "./components/loader/Loader.js";

const inputStyle = {
  backgroundColor: "transparent",
  border: "1px solid rgba(255,255,255,0.4",
  borderRadius: "2vw",
  minHeight: "5vh",
  width: "100%",
  fontSize: "3vw",
  marginBottom: "1rem",
  color: "rgba(255,255,255,0.8",
  paddingLeft: "2vw",
  paddingRight: "2vw",
};

const buttonStyle = {
  backgroundColor: "transparent",
  border: "1px solid rgba(255,255,255,0.4",
  color: "rgba(255,255,255,0.7",
  paddingLeft: "2vw",
  paddingRight: "2vw",
  paddingTop: "2%",
  paddingBottom: "2%",
  minHeight: "5vh",
  fontSize: "3vw",
  cursor: "pointer",
  borderRadius: "2vw",
};

function App() {
  const [userMessage, setUserMessage] = useState("");
  const [gptAnswer, setGptAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const openai = new OpenAIApi(
    new Configuration({
      apiKey: env.API_KEY,
    })
  );

  const actionHandler = () => {
    setLoading(true);
    openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }],
      })
      .then((res) => setGptAnswer(res.data.choices[0].message.content))
      .catch((err) => console.log(err))
      .finally(setLoading(true));

    setUserMessage("");
  };

  return (
    <div className="App">
      <div>
        <h1 style={{ marginBottom: "2rem", fontSize: "5vw" }}>Поле ответа</h1>
        <div
          style={{
            wordBreak: "break-word",
            fontSize: "2rem",
          }}
        >
          {loading ? <Loader /> : gptAnswer}
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <input
          style={inputStyle}
          type="text"
          onChange={(e) => setUserMessage(e.target.value)}
          value={userMessage}
        />
        <button
          style={buttonStyle}
          onClick={actionHandler}
        >
          Подать запрос
        </button>
      </div>
    </div>
  );
}

export default App;
