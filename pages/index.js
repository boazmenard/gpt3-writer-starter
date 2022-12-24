import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userInput }),
    })

    const data = await response.json();
    const { output } = data;
    
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  
  const onUserChangeInput = (event) => {
    setUserInput(event.target.value);
  }

  const copyResponseToClipboard = () => {
    const text = document.getElementById("api-output");
    navigator.clipboard.writeText(text.value);

    alert("Copied to clipboard!")
  }

  return (
    <div className="root">
      <Head>
        <title>TrainAnimeAI | bomenardco</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>TrainAnimeAI</h1>
          </div>
          <div className="header-subtitle">
            <h2>Train like your favorite anime character. Use the power of anime to achieve fitness immortality.</h2>
          </div>
        </div>
        {/* Add this code here*/}
        <div className="prompt-container">
          <div className="header-subtitle">
            <h2>Anime Character:</h2>
          </div>
          <textarea placeholder="start typing here" className="prompt-box" value={userInput} onChange={onUserChangeInput}/>
          {/* New code I added here */}
          <div className="prompt-buttons">
            <a className={isGenerating ? 'generate-button loading' : "generate-button"} onClick={callGenerateEndpoint}>
              <div className="generate">
                {isGenerating ? <span className='loader'></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {/* New code I added here */}
          {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
              <div>
                <a className="generate-button" onClick={copyResponseToClipboard}>
                  <div className="generate">
                    <p>Copy to clipboard</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="output-content">
              <p id='api-output'>{apiOutput}</p>
            </div>
          </div>
        )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://www.buymeacoffee.com/bomenardco"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <p>buy me a coffee</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
