import './ToggleSwitch.css';

import React, { useState } from 'react'

const ToggleSwitch = ({initial = false, onToggle}) => {
    const [isToggled, setIsToggled] = useState(initial)

    const handleToggle = () => {
        setIsToggled(prev => {
            const newState = !prev;
            if(onToggle) onToggle(newState);
            return newState
        })
    }
  return (
    <label className='toggle-switch'>
        <input
            type='checkbox'
            checked={isToggled}
            onChange={handleToggle}
            aria-checked={isToggled}

        />
        <span className='slider'></span>
    </label>
  )
}

export default ToggleSwitch