import React, { useState } from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
// import Logo from './logo.svg';
import './Popup.css';

export const Popup = () => {
  const [isToggledImage, setIsToggledImage] = useState(false);
  const [isToggledText, setIsToggledText] = useState(false);
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleToggleImage = () => {
    setIsToggledImage(!isToggledImage);
  }

  var r = document.querySelector(':root');
  const handleToggleText = () => {
    setIsToggledText(!isToggledText);
    if (isToggledText == true) {
      r.style.setProperty('--option', 'gray');
    }
    else {
      r.style.setProperty('--option', 'black');
    }
    
  }

  const handleSubmit = () => {
    // Add the input value to the tags array
    setTags([...tags, inputValue]);

    // Clear the input value
    setInputValue('');
  }

  const handleReset = () => {
    // Clear the tags array and input value
    setTags([]);
    setInputValue('');
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const divStyle = {
    display: 'flex'
  }

  return (
    <div className="everything">
      
      <p>Input keywords of the type of content you wish to filter.</p>

      <h5>Keywords</h5>

      <div className='form'>
        {/* Text box */}
        
        <div className='input-container'>
          <input
            type='text'
            placeholder='Type here...'
            value={inputValue}
            onChange={handleInputChange}
          />
          <button className='submit-button' onClick={handleSubmit}>Add tag</button>
        </div>

        {/* Tag list */}
        <div className='tag-list'>
          {tags.map(tag => (
            <div key={tag} className='tag'>{tag}</div>
          ))}
        </div>

        {/* Reset button */}
        <button className='reset-button' onClick={handleReset}>Clear Tags</button>
      </div>
      
      <h4>Image Filter</h4>
      <div className = "Toggle">
        <Toggle
          checked={isToggledImage}
          onChange={handleToggleImage}
          icons={false}
        />
        </div>
        <h4>Text Filter</h4>
        <div className = "Toggle">
        <Toggle
          checked={isToggledText}
          onChange={handleToggleText}
          icons={false}
        />
        </div>
        <form style={divStyle}>
          <input type="radio" name="choice" value="Scripting"></input>
          <p className="options">Neutralize</p>
          <input type="radio" name="choice" value="Scripting"></input>
          <p className="options">Blur</p>
        </form>
    </div>
  )
}
