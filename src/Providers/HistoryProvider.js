import React, { createContext, useState } from 'react';

const HistoryContext = createContext();

const HistoryProvider = ({children}) => {

    const [history, setHistory] = useState( () => {
        // Función para obtener el historial desde localStorage
        let history  = localStorage.getItem('history')
        return history ? JSON.parse(history) : []
    });

    // Función para eliminar el historial de localStorage
    const deleteHistory = () => {
        localStorage.removeItem('history');
        setHistory([]);
    };

    const addToHistory = (newEntry) => {
        const updatedHistory = [...history, newEntry];
        setHistory(updatedHistory);
        localStorage.setItem('history', JSON.stringify(updatedHistory));
      };

    return(
        <HistoryContext.Provider value={{history, addToHistory, deleteHistory}}>
            {children}
        </HistoryContext.Provider>
    )

  };


export const useHistoryContext = () =>  React.useContext(HistoryContext)

export default HistoryProvider;

