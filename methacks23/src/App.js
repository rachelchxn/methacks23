import logo from './logo.svg';
import { Popup } from './Popup';
import { useState, useEffect, useRef } from 'react';
import * as mobilenet from "@tensorflow-models/mobilenet";
import './App.css'

// THIS IS JUST DATA FOR THE COHERE API
const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: 'Bearer m24CBlVWn5iiojSf5Ap9DmcoJmxFMSFj0Dd1xjg5'
  },
  body: JSON.stringify({
    inputs: [
      'this game sucks, you suck',
      'stop being a dumbass',
      'Let\'s do this once and for all',
      'This is coming along nicely'
    ],
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

  // Load Model
  const [isModelLoading, setIsModelLoading] = useState(false)
  const [model, setModel] = useState(null)
  const imageRef = useRef()
  const [results, setResults] = useState([])
  const [visible, setVisible] = useState(true)

  const loadModel = async () => {
    setIsModelLoading(true)
    try {
      const model = await mobilenet.load()
      setModel(model)
      setIsModelLoading(false)
    } catch (error) {
      console.log(error)
      setIsModelLoading(false)
    }
  }

  const identify = async () => {
    console.log('hello')
    const result = await model.classify(imageRef.current)
    setResults(result)
    let includesObj = false;
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      if (result.className.includes("jersey")) {
        includesObj = true;
        break;
      }
    }
    if (includesObj) {
      setVisible(true)
    } else {
      setVisible(false)
    }
}

  useEffect(() => {

    async function runCohereApi() {
      
      // I STOLE THIS FROM THE COHERE API. USING THE FETCH VERSION OF THEIR EXAMPLE CODE
      const data = await fetch('https://api.cohere.ai/v1/classify', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

      console.log(data);
    }

    runCohereApi();
    loadModel()
  }, []);

  return (
    <div className="App">
      <Popup/>
      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />
        <img className={!visible && 'blur'} onClick={identify} src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80' alt='' ref={imageRef} crossOrigin='anonymous'/>
        {/* <img  src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80' alt=''  crossOrigin='anonymous'/> */}
      </header>
    </div>
  );
}

export default App;
