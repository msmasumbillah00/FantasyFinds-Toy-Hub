import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../context/DataContextProvider';

const Pagination = ({ totalPages }) => {
    // console.log(totalPages)
    const { currentPage, goToNextPage, goToPreviousPage, setCurrentPage } = useContext(DataContext)

    const maxPageButtons = 2; // Maximum number of page buttons to display
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = () => {
        let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
        let endPage = startPage + maxPageButtons - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - maxPageButtons + 1);
        }

        const pages = [];

        if (startPage > 1) {
            pages.push(
                <li key={1}>
                    <Link
                        onClick={() => setCurrentPage(1)}
                        to={`page/1`}
                        className={`bg-gray-200 text-gray-700 px-4 py-2 m-1 rounded-lg`}
                    >
                        1
                    </Link>
                </li>
            );
            if (startPage > 2) {
                pages.push(
                    <li key="ellipsis-start">
                        <span>...</span>
                    </li>
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <li key={i}>
                    <Link
                        onClick={() => setCurrentPage(i)}
                        to={`page/${i}`}
                        className={`${currentPage === i
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                            } px-4 py-2 m-1 rounded-lg`}
                    >
                        {i}
                    </Link>
                </li>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(
                    <li key="ellipsis-end">
                        <span>...</span>
                    </li>
                );
            }
            pages.push(
                <li key={totalPages}>
                    <Link
                        onClick={() => setCurrentPage(totalPages)}
                        to={`page/${totalPages}`}
                        className={`bg-gray-200 text-gray-700 px-4 py-2 m-1 rounded-lg`}
                    >
                        {totalPages}
                    </Link>
                </li>
            );
        }

        return pages;
    };

    return (
        <nav className="flex justify-center">
            <ul className="flex items-center">
                <li>
                    {
                        currentPage === 1 ?
                            <button
                                to={`page/${currentPage - 1}`}
                                onClick={goToPreviousPage}
                                disabled={currentPage === 1}
                                className="bg-gray-200 text-gray-700 px-4 py-2 m-1 rounded-lg"
                            >
                                «
                            </button> :
                            <Link
                                to={`page/${currentPage - 1}`}
                                onClick={goToPreviousPage}
                                disabled={currentPage === 1}
                                className="bg-gray-200 text-gray-700 px-4 py-2 m-1 rounded-lg"
                            >
                                «
                            </Link>
                    }

                </li>
                {renderPageNumbers()}
                <li>

                    {
                        currentPage === totalPages ?
                            <button
                                to={`page/${currentPage + 1}`}
                                onClick={() => goToNextPage(totalPages)}
                                disabled={currentPage === totalPages}
                                className="bg-gray-200 text-gray-700 px-4 py-2 m-1 rounded-lg"
                            >
                                »
                            </button> :
                            <Link
                                to={`page/${currentPage + 1}`}
                                onClick={() => goToNextPage(totalPages)}
                                disabled={currentPage === totalPages}
                                className="bg-gray-200 text-gray-700 px-4 py-2 m-1 rounded-lg"
                            >
                                »
                            </Link>
                    }
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
