import { useState, useEffect } from "react";
import Message from "./Message";
import Input from "./Input";
import History from "./History";
import Clear from "./Clear";
import styles from "./Clear.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./mui.css";
import { Typography } from "@mui/material";

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Welcome! How May I Assist You ?" },
  ]);
  const [history, setHistory] = useState([]);
  const [word, setWord] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedText, setRecordedText] = useState("");
  const [recordedTextDuringRecording, setRecordedTextDuringRecording] = useState("");
  const [goButtonClicked, setGoButtonClicked] = useState(false);
  console.log(isSpeaking,"isSpeaking")
  console.log(isRecording,"isRecording")

  useEffect(() => {
    const handleVoicesChanged = () => {
      // Update voices or perform any other actions when voices change
    };

    // Listen for the 'voiceschanged' event
    speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);

    // Clean up the event listener when the component unmounts
    return () => {
      speechSynthesis.removeEventListener(
        "voiceschanged",
        handleVoicesChanged
      );
    };
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  const handleChangeLookup = (event) => {
    setWord(event.target.value);
  };

  const handleSubmit = async () => {
    const prompt = {
      role: "user",
      content: word + " " + input,
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
      // setIsRecording(true);
      handleSubmit();
      setGoButtonClicked(true); // Set the state to true when Go button is clicked
    }
  };

  const handleSpeakerClick = (content) => {
    const selectedLanguage = word.toLowerCase();
    
    // Extract language code from the selected value (assuming the format is "Translate to [language] -[code]")
    const languageCodeMatch = selectedLanguage.match(/-([a-z]+)$/);
    const languageCode = languageCodeMatch ? languageCodeMatch[1] : null;
  console.log(languageCode,"langaugecode")
  console.log(languageCodeMatch,"languageCodeMatch")
    if (!languageCode) {
      // Handle the case where the language code is not found
      console.error('Language code not found in selected value');
      return;
    }
  
    // Get all available voices
    const voices = window.speechSynthesis.getVoices();
    
    // Find a voice for the specified language code
    const targetVoice = voices.find((voice) => voice.lang.toLowerCase().includes(languageCode));
    
    if (targetVoice) {
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.voice = targetVoice;
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    
      setTimeout(() => {
        setIsSpeaking(false);
      }, 1000);
    } else {
      // Fallback to the default behavior if the specified voice is not found
      const utterance = new SpeechSynthesisUtterance(content);
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    
      setTimeout(() => {
        setIsSpeaking(false);
      }, 1000);
    }
  };
  
  
  
  
  

  const handleMicClick = () => {
    const MAX_RECORDING_TIME = 1000; // 30 seconds in milliseconds

    if (!isRecording) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "pt-pt";
      recognition.continuous = true;
      recognition.interimResults = true;
  
      recognition.onstart = () => {
        setIsRecording(true);
      };
  
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
  
        // Update recordedText immediately
        setRecordedText(transcript);
  
        // Optionally, update a state for recordedText during recording
        setRecordedTextDuringRecording(transcript);
      };
  
      recognition.onend = () => {
        setIsRecording(false);
      };
  
      // Start the recognition
      recognition.start();
  
      // Set a timeout to stop the recognition after 30 seconds
      setTimeout(() => {
        if (isRecording) {
          recognition.stop();
          setIsRecording(false);
        }
      }, MAX_RECORDING_TIME);
    } else {
      // Stop recording without stopping recognition
      setIsRecording(false);
    }
  };
  

  return (
    <div className="App">
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          fontSize: "2rem",
          // width: "1170px",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label"  style={{ fontSize:"14px" }}>Translate</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={word}
            label="Translate"
            onChange={handleChangeLookup}
            style={{textAlign:"left"}}
          >
            <MenuItem value="Translate to portuguese -pt">
              Translate to portuguese
            </MenuItem>
            <MenuItem value="Translate to spanish -es">
              Translate to spanish
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{ display: "",border:""}}>
        <div className="" style={{ display: "" }}>
          <h3 style={{ textAlign:"left" }}>Input here</h3>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onClick={input && word ? handleSubmit : undefined}
            style={{ marginBottom: "" }}
          />
          <div style={{height:"50px", display: "flex", alignItems: "center",justifyContent: "right",fontSize:"14px"}}>
          <span style={{ float:"right",marginLeft: "", display: "" }}>
            &nbsp;
          <button className="clearbtn" onClick={clear} style={{borderRadius:"4px",backgroundColor:"gray",minWidth:"10em",fontSize:"14px",fontWeight:"600",fontWeight:"100"}} >Clear
      </button>
            <button className={styles.wrapper} onClick={handleGoClick} style={{backgroundColor:"#410099",borderRadius:"4px",minWidth:"10em",marginInline:"10px",fontSize:"14px",fontWeight:"600",fontWeight:"100"}}>
              Go
            </button>
           </span>
           </div>
        </div>
      </div>
      <div>
        <div className="Column">
          
          {/* <div className="Content">
          <div className="_wrapper_aaqxy_1" style={{ backgroundColor: 'white',padding:"0px",border:"1px solid #707070" }}>
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
          </div> */}
          <div >
            <h3 className="Title" style={{textAlign:"left"}} >Output</h3>
          </div>
          {/* <div style={{ display: 'flex' }}>
            <Typography style={{ marginLeft: '500px' }}> now tell me what you have listened in speaker</Typography>
            <div style={{ marginLeft: "150px" }}>
              <Typography>Result</Typography>
            </div>
          </div> */}
          <div style={{ display: "" }}>
            <div className="Content">
            <div className="" style={{ backgroundColor: 'white',padding:"0px",border:"" }}>
              {messages.map((el, i) => {
                return (
                  <Message key={i} role={el.role} content={el.content} />
                );
              })}
              </div>
            </div>
            {/* <div style={{ width: "100%", marginLeft: "100px", display: 'flex' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
                style={{ width: "50px", cursor: "pointer" }}
                onClick={() =>
                  handleSpeakerClick(messages[messages.length - 1].content)
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                />
              </svg>
              {isSpeaking && <span style={{ marginLeft: "50px" }}>Speaking...</span>}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
                style={{ width: '50px', cursor: "pointer", marginLeft: "150px" }}
                onClick={handleMicClick}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                />
              </svg>
              {isRecording && <span style={{ marginLeft: "10px" }}>Recording...</span>}
            </div>
         */}

<div className="Content">
  {messages.slice(1).map((el, i) => {
    const trimmedContent = el.content.trim().toLowerCase();
    const trimmedRecordedText = (isRecording ? recordedTextDuringRecording : recordedText).trim().toLowerCase();

    console.log(trimmedContent, "trimmedContent");
    console.log(trimmedRecordedText, "trimmedRecordedText");

    const isMatch = trimmedContent.includes(trimmedRecordedText);
    const successMessage = 'Speech is successful!';
    const failureMessage = 'Try again, the speech did not match.';
    const resultMessage = isMatch ? successMessage : failureMessage;
    const resultStyle = isMatch ? { color: 'green' } : { color: 'red' };

    return (
      <div key={i}>
        {/* Conditionally render the Comparison Result based on !isRecording and goButtonClicked */}
        {/* {i === messages.length - 2 && !isRecording && goButtonClicked && (
          <div>
            <h3 className="Title">Comparison Result</h3>
            <p style={resultStyle}>{resultMessage}</p>
          </div>
        )} */}
      </div>
    );
  })}
</div> 






          </div>
          {/* <div>
            <h3 className="Title">Recorded Text</h3>
            <p>{recordedText} </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
