import { useRef, useState } from 'react';
import './Counter.css';
import ToggleSwitch from '../toggle-switch/ToggleSwitch';

const Counter = () => {
    const [count, setCount] = useState<number>(0);
    const [minimum, setMinimum] = useState<number | null>(null)
    const [maximum, setMaximum] = useState<number | null>(null)
    const [disableActionButtons, setDisableActionButtons] = useState(false)
    const ref = useRef(null)

    const setMaximumCount = (value: number) => {
        setMaximum(value)
    }

    const setMinimumCount = (value: number) => {
        setMinimum(value)
    }



    const increment = () => {
        if(maximum !== null && (count + 1 > maximum)) {
            return
        }
        setCount((prevCount) => prevCount + 1)
    }

    const decrement = () => {
        if(minimum !== null && (count - 1 < minimum)) {
            return
        }
        setCount((prevCount) => prevCount - 1)
    }

    const toggleButtonDisability = (disable: boolean) => {
        setDisableActionButtons(disable)
    }
    
  return (
    <>
      <header>
          <h1>
            <u>Counter</u>
          </h1>
           Disable:  <ToggleSwitch initial={disableActionButtons} onToggle={toggleButtonDisability}  />
      </header>
      <h1>{count}</h1>
      <div className="action-buttons">
        <button onClick={increment} disabled={disableActionButtons}>Increment</button>
        <button onClick={decrement} disabled={disableActionButtons} >Decrement</button>
      </div>
      <div className="value-defaults-form">
        <div className='minimum-input'>
            <label htmlFor="minimum-number">Minimum: </label>
            <input type="number" id='minimum-number' onChange={(e) => setMinimumCount(Number(e.target.value))} />
        </div>
        <div className='maximum-input'>
            <label htmlFor="maximum-number">Maximum: </label>
            <input type="number" id='maximum-number' onChange={(e) => setMaximumCount(Number(e.target.value))} />
        </div>
        <div className='save-button'>
            <button>Set</button>
        </div>
      </div>
    </>
  );
};
export default Counter;
