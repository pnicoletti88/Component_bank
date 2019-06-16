import React from 'react';
import logo from './logo.svg';
import './App.css';
import InputDynamicSuggestion from './Components/InputDynamicSuggestion/InputDynaimcSuggestion';

function App() {
  return (
    <div className="App">
      <InputDynamicSuggestion initialPlaceHolder="Enter Employee ID or Email"/>
    </div>
  );
}

export default App;
