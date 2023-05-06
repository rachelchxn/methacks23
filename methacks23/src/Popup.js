import React, { useState } from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import './custom-toggle.css';
import Logo from './logo.svg';
import './submit-button.css';

export const Popup = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
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
      <button className='submit-button'>Submit</button>
    </div>
  )
  
}
