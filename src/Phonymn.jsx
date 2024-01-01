import { useState } from "react";
import Message from "./Message";
import Input from "./Input";
import History from "./History";
import Clear from "./Clear";
import styles from "./Clear.module.css";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Welcome! How May I Assist You ?" },
  ]);
  const [history, setHistory] = useState([]);
  const [word, setWord] = useState('');
  console.log(word, "word")
  const API_KEY = "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";
  const handleChangeLookup = (event) => {
    setWord(event.target.value);
  };
  console.log(input, "input")
  console.log(messages, "input")
  console.log(history, "input")

  const handleSubmit = async () => {
    const prompt = {
      role: "user",
      content: word + " " + input, // Concatenate the selected word with input
    };

    setMessages([...messages]);

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [...messages, prompt],
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        const res = data.choices?.[0].message.content;
        console.log(data, "res")
        setMessages((messages) => [
          ...messages,
          {
            role: "assistant",
            content: res,
          },
        ]);
        setHistory((history) => [...history, { answer: res }]);
        setInput("");
      });
  };

  const clear = () => {
    setMessages([]);
    setHistory([]);
  };

  const handleGoClick = () => {
    if (input && word) {
      handleSubmit();
    }
  };

  return (
    <div className="App">
      <div style={{ alignItems: "center", display: "flex", justifyContent: "center", fontSize: "2rem", width: "1170px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Phonymn</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={word}
            label="Phonymn"
            onChange={handleChangeLookup}
          >
            <MenuItem value="phonetic for the word ">phonetic for the word </MenuItem>
            <MenuItem value="phonetic for the word ">phonetic for the word </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{ display: "flex", marginTop: "50px" }}>
        <div className="Column">
        <h3 style={{  marginTop: "-43px" }}>Input here</h3>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onClick={input && word ? handleSubmit : undefined}
            style={{ marginBottom: "20px" }}
          />
          <span style={{ marginTop: "20px" }}>
            <Clear onClick={clear} />
            <button className={styles.wrapper} onClick={handleGoClick}>
              Go
            </button>
          </span>
        </div>
        <div style={{ marginLeft: "500px", marginTop: "-70px" }}>
          <h3 className="Title">output</h3>
          <div className="Content">
            {messages.map((el, i) => {
              return <Message key={i} role={el.role} content={el.content} />;
            })}
          </div>
        </div>
      </div>
      <div>
        <div className="Column">
          <h3 className="Title"></h3>
          <div className="Content">
            {history.map((el, i) => {
              return (
                <History
                  key={i}
                  question={el.question}
                  onClick={() =>
                    setMessages([
                      { role: "assistant", content: el.answer },
                    ])
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
