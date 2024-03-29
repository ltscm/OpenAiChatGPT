import React, { useState } from 'react';
import  "./mui.css"// Replace with your actual stylesheet path
import styles from "./Clear.module.css";

const API_KEY = "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"; // Replace with your actual API key

function App() {
  const [word, setWord] = useState("");
  const [synonyms, setSynonyms] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default to English

  async function callOpenAIAPI() {
    console.log("Calling the OpenAI API for synonyms");

    // Modify the prompt to request synonyms for the entered word and language
    const APIBody = {
      "model": "text-davinci-003", // Replace with a model that supports the target language
      "prompt": `Synonyms for the word: ${word} (Language: ${selectedLanguage})`, // Include language information in the prompt
      "temperature": 0.7,
      "max_tokens": 60,
      "top_p": 1.0,
      "frequency_penalty": 0.0,
      "presence_penalty": 0.0
    }

    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + API_KEY
        },
        body: JSON.stringify(APIBody)
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      console.log(data);

      if (data.choices && data.choices.length > 0) {
        setSynonyms(data.choices[0].text.trim());
      } else {
        setSynonyms("No synonyms found");
      }
    } catch (error) {
      console.error("API call error:", error);
      setSynonyms("Error fetching synonyms");
    }
  }

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <div className={styles.appContainer}>
      <div>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder='Enter a word to find synonyms'
        className={styles.input}
        style={{paddingLeft:"10px",height:"4em",width:"100%",border:"1px solid rgba(0, 0, 0, 0.23)", fontSize:"14px",borderRadius:"4px"}}
      />
      </div>
      <div style={{margin:"1em"}}>
      <select onChange={handleLanguageChange} value={selectedLanguage} className={styles.select} style={{height:"2em",width:"10em"}}>
        <option value="pt">Portuguese</option>
        <option value="es">Spanish</option>
        <option value="en">English</option>
        {/* Add more language options as needed */}
      </select>
      </div>
      <div style={{marginBlock:"4em"}}>
      <button onClick={callOpenAIAPI} className={styles.button} style={{height:"40px",color:"white",backgroundColor:"#410099",borderRadius:"4px",minWidth:"10em",border:"none",fontSize:"14px"}}>Get Synonyms</button>
      {synonyms !== "" &&
        <div className={styles.synonymsContainer}>
          <h3 className={styles.synonymsHeader}>Synonyms for "{word}" in {selectedLanguage}:</h3>
          <p className={styles.synonyms}>{synonyms}</p>
        </div>
       
      }
       </div>
    </div>
  );
}

export default App;
