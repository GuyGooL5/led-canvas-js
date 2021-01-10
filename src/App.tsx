import React, { useState } from 'react';
import './App.css';
import LedClock from './components/LedClock';

function App() {

  const [mode, setMode] = useState<"clock" | "paint">("clock")

  function toggle() {
    setMode(mode === "clock" ? "paint" : "clock")

  }

  return <>
    <LedClock height={9} width={50} mode={mode} />
    <button onClick={toggle}> toogle</button>
  </>;
}

export default App;
