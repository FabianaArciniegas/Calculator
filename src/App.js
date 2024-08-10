import React from "react";
import { Route, Routes} from 'react-router-dom';
import './App.css';
import HistoryProvider from './Providers/HistoryProvider'
import Calculator from './Components/Calculator';

import History from "./Components/History";

function App() {

  return (
    <div className="App">

    <HistoryProvider>
        <Routes>
          <Route exact path="/" element={<Calculator/>}></Route>
          <Route path="/history" element={<History />}></Route>
        </Routes>
    </HistoryProvider>

    </div>
  );
}

export default App;

// history={history} clearHistory={clearHistory}