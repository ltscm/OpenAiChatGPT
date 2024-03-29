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
      <div style={{ alignItems: "center", display: "flex", justifyContent: "center", fontSize: "2rem", width: "" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label"  style={{ fontSize:"14px" }}>Phonymn</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={word}
            label="Phonymn"
            onChange={handleChangeLookup}
            style={{textAlign:"left"}}
          >
            <MenuItem value="phonetic for the word ">phonetic for the word </MenuItem>
            <MenuItem value="phonetic for the word ">phonetic for the word </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{ display: "", marginTop: "" }}>
        <div className="Column">
        <h3 style={{ textAlign:"left" }}>Input here</h3>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onClick={input && word ? handleSubmit : undefined}
            style={{ marginBottom: "20px" }}
          />
          {/* <div style={{float:"right",height:"50px"}}>
          <span style={{ marginTop: "20px" }}>
            <Clear className="clearbtn"  onClick={clear} />
            <button className={styles.wrapper} onClick={handleGoClick} style={{backgroundColor:"#410099",borderRadius:"4px",minWidth:"10em",marginInline:"10px"}}>
              Go
            </button>
          </span>
          </div> */}

<div style={{height:"50px", display: "flex", alignItems: "center",justifyContent: "right"}}>
          <span style={{ float:"right",marginLeft: "", display: "" }}>
            &nbsp;
            <button className="clearbtn" onClick={clear} style={{borderRadius:"4px",backgroundColor:"gray",minWidth:"10em",fontSize:"14px",fontWeight:"600",fontWeight:"100",border:"0px",color:"white",letterSpacing:"0.5px"}} >Clear
      </button>
            <button className={styles.wrapper} onClick={handleGoClick} style={{backgroundColor:"#410099",borderRadius:"4px",minWidth:"10em",marginInline:"10px",fontSize:"14px",fontWeight:"100",letterSpacing:"0.5px"}}>
              Go
            </button>
           </span>
           </div>



        </div>
        <div style={{}}>
          <h3 className="Title" style={{textAlign:"left" }}>Output</h3>
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
