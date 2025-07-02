import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Geeting from './components/Geeting';

function App() {
  const name = "duc";
  const element = <h1>Hello, {name}!</h1>;

  return (
    <>
      {element}
      <Geeting />
    </>
  );
}

export default App;