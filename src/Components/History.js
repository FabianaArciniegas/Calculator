import React from "react";
import "../CSS/style.css";
import { Link } from "react-router-dom";
import { useHistoryContext } from "../Providers/HistoryProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';


const History = () => {

    const { history, deleteHistory } = useHistoryContext();

  return (
    <div className="App-history">

      <div className="App-tittleHistory">
        <button><Link to="/"><FontAwesomeIcon icon={faArrowLeftLong}  className="iconArrow"/></Link></button>
        <h1>Historial</h1>
        <button onClick={deleteHistory}><FontAwesomeIcon icon={faTrash} className="iconTrash"/></button>
      </div>

      <p>{history.map((expression, index) => (<li key={index}>{expression}</li>))}</p>

    </div>
  );
};

export default History;
