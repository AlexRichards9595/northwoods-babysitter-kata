import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import babysitterCalculator from "./babysitter-calculator/BabysitterCalculator";

function App() {
  const [result, setResult] = useState<string | null>();
  const startTimeRef = useRef<HTMLInputElement>(null);
  const bedTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const startTime = startTimeRef?.current?.value || "";
    const endTime = endTimeRef?.current?.value || "";
    const bedTime = bedTimeRef?.current?.value || "";

    const calculation = babysitterCalculator(startTime, endTime, bedTime);

    setResult(calculation);
  }

  return (
    <div className="App">
        <h1>Babysitter Calculator</h1>
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <input type='text' ref={startTimeRef} placeholder='Start time (HH:MM)' />
            <input type='text' ref={bedTimeRef} placeholder='Bed time (HH:MM)'></input>
            <input type='text' ref={endTimeRef} placeholder='End time (HH:MM)'></input>
          </div>
          <button type="submit">Calculate</button>
        </form>
        {result && <h1>{result}</h1>}
    </div>
  );
}

export default App;
