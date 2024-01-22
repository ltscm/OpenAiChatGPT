// import React, { useState } from "react";
// import "./App.css";
// import { Configuration, OpenAIApi } from "openai";
// import { BeatLoader } from "react-spinners";

// const App = () => {
//   const [formData, setFormData] = useState({ language: "Hindi", message: "" });
//   const [error, setError] = useState("");
//   const [showNotification, setShowNotification] = useState(false);
//   const [translation, setTranslation] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//  console.log(formData,"formdata")
//   const configuration = new Configuration({
//     apiKey: import.meta.env.VITE_OPENAI_KEY,
//   });
//   const openai = new OpenAIApi(configuration);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const translate = async () => {
//     const { language, message } = formData;
//     const grammarInstruction = "Ensure proper sentence structure.";
//     const response = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `Translate this into ${language}: ${message}. ${grammarInstruction}`,
//       temperature: 0.3,
//       max_tokens: 100,
//       top_p: 1.0,
//       frequency_penalty: 0.0,
//       presence_penalty: 0.0,
//     });
// console.log(response,"response")
//     const translatedText = response.data.choices[0].text.trim();
//     setIsLoading(false);
//     setTranslation(translatedText);
//   };

//   const handleOnSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.message) {
//       setError("Please enter the message.");
//       return;
//     }
//     setIsLoading(true);
//     translate();
//   };

//   const handleCopy = () => {
//     navigator.clipboard
//       .writeText(translation)
//       .then(() => displayNotification())
//       .catch((err) => console.error("failed to copy: ", err));
//   };

//   const displayNotification = () => {
//     setShowNotification(true);
//     setTimeout(() => {
//       setShowNotification(false);
//     }, 3000);
//   };

//   return (
//     <div className="container">
//       <h1>Translation</h1>

//       <form onSubmit={handleOnSubmit}>
//         <div className="choices">
//           <input
//             type="radio"
//             id="hindi"
//             name="language"
//             value="Hindi"
//             defaultChecked={formData.language}
//             onChange={handleInputChange}
//           />
//           <label htmlFor="hindi">Hindi</label>

//           <input
//             type="radio"
//             id="spanish"
//             name="language"
//             value="Spanish"
//             onChange={handleInputChange}
//           />
//           <label htmlFor="spanish">Spanish</label>

//           <input
//             type="radio"
//             id="japanese"
//             name="language"
//             value="Japanese"
//             onChange={handleInputChange}
//           />
//           <label htmlFor="japanese">Japanese</label>

//           <input
//   type="radio"
//   id="french"
//   name="language"
//   value="French"
//   onChange={handleInputChange}
// />
// <label htmlFor="french">French</label>
          
// <input
//   type="radio"
//   id="portuguese"
//   name="language"
//   value="Portuguese"
//   onChange={handleInputChange}
// />
// <label htmlFor="portuguese">Portuguese</label>

// <input
//   type="radio"
//   id="kannada"
//   name="language"
//   value="Kannada"
//   onChange={handleInputChange}
// />
// <label htmlFor="kannada">Kannada</label>

// <input
//   type="radio"
//   id="italian"
//   name="language"
//   value="Italian"
//   onChange={handleInputChange}
// />
// <label htmlFor="italian">Italian</label>
// <input
//   type="radio"
//   id="sanskrit"
//   name="language"
//   value="Sanskrit"
//   onChange={handleInputChange}
// />
// <label htmlFor="sanskrit">Sanskrit</label>
//         </div>

//         <textarea
//           name="message"
//           placeholder="Type your message here.."
//           onChange={handleInputChange}
//         ></textarea>

//         {error && <div className="error">{error}</div>}

//         <button type="submit">Translate</button>
//       </form>

//       <div className="translation">
//         <div className="copy-btn" onClick={handleCopy}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
//             />
//           </svg>
//         </div>
//         {isLoading ? <BeatLoader size={12} color={"red"} /> : translation}
//       </div>

//       <div className={`notification ${showNotification ? "active" : ""}`}>
//         Copied to clipboard!
//       </div>
//     </div>
//   );
// };

// export default App;

// import { useState } from "react";

// import Message from "./Message";
// import Input from "./Input";
// import History from "./History";
// import Clear from "./Clear";

// // import "./styles.css";

// export default function App() {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [history, setHistory] = useState([]);
//   console.log(input,"input")
//   console.log(messages,"input")
//   console.log(history,"input")
//   const handleSubmit = async () => {
//     const prompt = {
//       role: "user",
//       content: input,
//     };

//     setMessages([...messages, prompt]);

//     await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         messages: [...messages, prompt],
//       }),
//     })
//       .then((data) => data.json())
//       .then((data) => {
//         const res = data.choices?.[0].message.content;
//         console.log(data,"res")
//         setMessages((messages) => [
//           ...messages,
//           {
//             role: "assistant",
//             content: res,
//           },
//         ]);
//         setHistory((history) => [...history, { question: input, answer: res }]);
//         setInput("");
//       });
//   };

//   const clear = () => {
//     setMessages([]);
//     setHistory([]);
//   };
//   return (
//     <div className="App">
//       <div className="Column">
//         <h3 className="Title">Chat Messages</h3>
//         <div className="Content">
//           {messages.map((el, i) => {
//             return <Message key={i} role={el.role} content={el.content} />;
//           })}
//         </div>
//         <Input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onClick={input ? handleSubmit : undefined}
//         />
//       </div>
//       <div className="Column">
//         <h3 className="Title">History</h3>
//         <div className="Content">
//           {history.map((el, i) => {
//             return (
//               <History
//                 key={i}
//                 question={el.question}
//                 onClick={() =>
//                   setMessages([
//                     { role: "user", content: history[i].question },
//                     { role: "assistant", content: history[i].answer },
//                   ])
//                 }
//               />
//             );
//           })}
//         </div>
//         <Clear onClick={clear}/>
//       </div>
//     </div>
//   );
// }

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Translator from "./Translator"
import Paper from '@mui/material/Paper';
import Phonymn from './Phonymn'
import Synonymn from "./Synonymn"
import  "./mui.css"


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{backgroundColor:"#f8f8f8",  textAlign:"center"}}>
      <Typography style={{color:"#410099", fontSize:"24px", fontWeight:"bold",paddingBlock:"1.4em",}} >Abakus Resource App </Typography>
   
      <Box
      // sx={{
      //   // display: 'flex',
      //   // flexWrap: 'wrap',
      //   '& > :not(style)': {
      //     // m: 1,
      //     width: 500,
      //     // height: 528,
      //   },
      // }}
      style={{display:"flex",justifyContent:"center", borderRadius:"6px",}}
    >
      <Paper style={{width:"50%",marginBottom:"3em"}} >
    
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
          <Tab label="Translator" style={{fontSize:"12px",fontWeight:"bold",letterSpacing:"0px"}} {...a11yProps(0)} />
          <Tab label="Phonymn" style={{fontSize:"12px",fontWeight:"bold",letterSpacing:"0px"}} {...a11yProps(1)} />
          <Tab label="Synonyms"  style={{fontSize:"12px",fontWeight:"bold",letterSpacing:"0px"}} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <Translator/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <Phonymn/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <Synonymn/>
      </CustomTabPanel>
      
  
    </Paper>
    </Box>
   
      
     
    
    </div>
   
  );
}
