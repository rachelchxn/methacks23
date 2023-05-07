import Logo from './logo.svg';
import {Popup} from './Popup.js';
import { useState, useEffect, useRef } from 'react';
import './App.css'

// THIS IS JUST DATA FOR THE COHERE API

let sentence = ''

const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: 'Bearer m24CBlVWn5iiojSf5Ap9DmcoJmxFMSFj0Dd1xjg5'
  },
  body: JSON.stringify({
    inputs: sentence,
    examples: [
      {text: 'you are hot trash', label: 'Toxic'},
      {text: 'go to hell', label: 'Toxic'},
      {text: 'get rekt moron', label: 'Toxic'},
      {text: 'get a brain and use it', label: 'Toxic'},
      {text: 'say what you mean, you jerk.', label: 'Toxic'},
      {text: 'Are you really this stupid', label: 'Toxic'},
      {text: 'I will honestly kill you', label: 'Toxic'},
      {text: 'yo how are you', label: 'Benign'},
      {text: 'I\'m curious, how did that happen', label: 'Benign'},
      {text: 'Try that again', label: 'Benign'},
      {text: 'Hello everyone, excited to be here', label: 'Benign'},
      {text: 'I think I saw it first', label: 'Benign'},
      {text: 'That is an interesting point', label: 'Benign'},
      {text: 'I love this', label: 'Benign'},
      {text: 'We should try that sometime', label: 'Benign'},
      {text: 'You should go for it', label: 'Benign'}
    ],
    truncate: 'END',
    model: 'large'
  })
};



function App() {
  useEffect(() => {

    // async function runCohereApi() {
      
    //   // I STOLE THIS FROM THE COHERE API. USING THE FETCH VERSION OF THEIR EXAMPLE CODE
    //   const data = await fetch('https://api.cohere.ai/v1/classify', options)
    //   .then(response => response.json())
    //   .then(response => console.log(response))
    //   .catch(err => console.error(err));

    //   console.log(data);
    // }

    // runCohereApi();
  }, []);

  return (
    <div className="App">
      <Popup />
      <footer>
        <button className="submit"> Submit </button>
      </footer>
    </div>
  );
}

export default App;
