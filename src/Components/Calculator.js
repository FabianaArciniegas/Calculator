import React, { useState, useEffect, useCallback } from "react";
import "../CSS/style.css";
import {Link } from 'react-router-dom';
import { useHistoryContext } from "../Providers/HistoryProvider";
import Tittle from './Tittle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDeleteLeft} from '@fortawesome/free-solid-svg-icons';
import { evaluate } from 'mathjs';

const Calculator = () => {

  const { addToHistory } = useHistoryContext();
  const [calculations, setCalculations] = useState("");
  const [result, setResult] = useState(0);
  const [isResultShown, setIsResultShown] = useState(false);


  const handleReset = useCallback(() => {
    setCalculations("");
    setResult(0);
    setIsResultShown(false)
  }, []);


  const handleDelete = useCallback(() => {
    setCalculations((calculations) => calculations.slice(0,-1))
  }, []);


  const handleClick = useCallback((value) => {
    // Si se muestra el resultado y el siguiente clic es un número, se reinicia
    if (isResultShown && !isNaN(parseFloat(value))) {
      setCalculations(value);
      setIsResultShown(false);
      setResult(0);
    } // Si se muestra el resultado y el siguiente clic es un operador matematico, sigue el calculo
    else if (isResultShown) {
      setIsResultShown(false);
      setCalculations((calculations) => (calculations = result + value));
      setResult("");
    } // Al inicio de la operacion o cuando se reinicia
    else {
      setCalculations((calculations) => calculations + value);
      setResult("");
    }
  }, [isResultShown, result]);


  const handleResult = useCallback(() => {
    try {
      // Maneja la multiplicación, porcentaje y exponentes
      let expression = calculations.replace(/x/g, '*').replace(/%/g, '/100*').replace(/\^/g, '**');;
      // Maneja la multiplicación implícita con paréntesis
      expression = expression.replace(/(\d)(\()/g, '$1*(').replace(/(\))(\d)/g, ')*$2');
      // Manejar la raíz cuadrada usando Math.sqrt
      expression = expression.replace(/√(\d+)/g, 'Math.sqrt($1)');

      const evalResult = evaluate(expression);
      setResult(evalResult);
      setIsResultShown(true);

      let expressionHistory = ` ${calculations} = ${evalResult}`
      addToHistory(expressionHistory);

    } catch (error) {
      setResult("Error");
    }
  }, [calculations, addToHistory]);


  // Manejar la entrada del teclado
  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;

      // Maneja números y operadores básicos
      if (!isNaN(key) || key === "+" || key === "-" || key === "*" || key === "/" || key === "(" || key === ")" || key === "%" || key === "." || key === "^" || key === "√") {
        handleClick(key === "*" ? "x" : key);
      }
      // Maneja el exponente usando ^
      else if (key === "e" || key === "^") {
      handleClick("^");
      }
      // Maneja la raíz cuadrada usando r
      else if (key === "r" || key === "v") {
      handleClick("√");
      }
      // Ejecuta el cálculo al presionar Enter o =
      else if (key === "Enter" || key === "=" ) {
        handleResult();
      }
      // Eliminar al presionar Backspace
      else if (key === "Backspace") {
        handleDelete();
      }
    };

    // Agregar el event listener
    window.addEventListener("keydown", handleKeyPress);

    // Limpiar el event listener al desmontar el componente
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleClick, handleResult, handleDelete]); // Dependencias


   return (
    <div>

       <Tittle/>

      <div className="App-buttonHistory">
        <button><Link to="/history" className="link">Historial</Link></button>
      </div>

      <div className="App-calculator">

        <div className="App-screen">
          <div className="Operations">
            <p>{calculations}</p>
          </div>
          <div className="Results">
            <p>{result}</p>
          </div>
        </div>

        <div className="App-button">
          <button onClick={handleReset}>AC</button>
          <button onClick={handleDelete}><FontAwesomeIcon icon={faDeleteLeft}/></button>
          <button onClick={() => handleClick("(")}>(</button>
          <button onClick={() => handleClick(")")}>)</button>
          <button onClick={() => handleClick("^")}>^</button>
          <button onClick={() => handleClick("√")}>√</button>
          <button onClick={() => handleClick("%")}>%</button>
          <button onClick={() => handleClick("/")}>/</button>
          <button onClick={() => handleClick("x")}>x</button>
          <button onClick={() => handleClick("-")}>-</button>
          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button onClick={() => handleClick("+")}>+</button>
          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>
          <button onClick={handleResult}>=</button>
          <button onClick={() => handleClick("0")}>0</button>
          <button onClick={() => handleClick(".")}>.</button>
        </div>

      </div>

    </div>
  );
};

export default Calculator;
