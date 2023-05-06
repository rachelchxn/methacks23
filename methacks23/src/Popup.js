import React, { useState } from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import Logo from './logo.svg';
import './Popup.css';

export const Popup = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  }

  const handleSubmit = () => {
    // Handle form submission logic here
  }

  const handleReset = () => {
    // Handle form reset logic here
  }

  return (
    <div>
      <div className='header'>
        <img src={Logo} alt="Logo"/>
        <h3>ZenSphere</h3>
        <Toggle
          checked={isToggled}
          onChange={handleToggle}
          icons={false}
        />
      </div>
      <h4>Image Filter</h4>
        <Toggle
          checked={isToggled}
          onChange={handleToggle}
          icons={false}
        />
        <h4>Text Filter</h4>
        <Toggle
          checked={isToggled}
          onChange={handleToggle}
          icons={false}
        />
      <div className='form'>
        {/* Submit button */}
        <button className='submit-button' onClick={handleSubmit}>Submit</button>
        
        {/* Reset button */}
        <button className='reset-button' onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
  
}
