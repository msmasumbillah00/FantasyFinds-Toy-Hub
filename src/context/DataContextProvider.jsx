import { useState } from 'react';
import { createContext } from 'react';


export const DataContext = createContext("");


const DataContextProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuqry, setSearchQuary] = useState([]);

    const goToNextPage = (totalPages) => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    const dbInfo = {
        currentPage,
        setCurrentPage,
        goToNextPage,
        goToPreviousPage,
        searchQuqry,
        setSearchQuary

    }
    return (
        <DataContext.Provider value={dbInfo}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContextProvider;