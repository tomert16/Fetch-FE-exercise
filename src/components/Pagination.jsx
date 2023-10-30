import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BsArrowRightCircle, BsArrowLeftCircle } from 'react-icons/bs';

const Pagination = ({ amount, currentSet, setCurrentSet, total, next, prev, beginning, end }) => {
    //calculate the total number of pages 
    const totalPages = Math.ceil(total / amount);

    //set the window size help calculate the total number of pages displayed in the pagination
    const windowSize = 10;
    let startPage = Math.max(1, currentSet - Math.floor(windowSize / 2));
    let endPage = Math.min(startPage + windowSize - 1, totalPages);

    //condition to adjust the window if it exceeds the total pages
    if (endPage - startPage + 1 < windowSize) {
        startPage = Math.max(1, endPage - windowSize + 1);
    }

    // Create an array of page numbers in the window 
    const slide = Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i);

  return (
    <PaginationContainer>
        <button className="previous" onClick={() => prev()} disabled={beginning}>
            <BsArrowLeftCircle />
        </button>
        {slide.map((pageNumber) => (
            <button className={currentSet === pageNumber ? 'active' : 'inactive'} key={pageNumber} onClick={() => setCurrentSet(pageNumber)}>
                {pageNumber}
            </button>
        ))}
        <button className="next" onClick={() => next()} disabled={end}>
            <BsArrowRightCircle />
        </button>
    </PaginationContainer>
  )
}

Pagination.propTypes = {
    amount: PropTypes.number,
    currentSet: PropTypes.number,
    setCurrentSet: PropTypes.func,
    total: PropTypes.number,
    next: PropTypes.func,
    prev: PropTypes.func,
    beginning: PropTypes.bool,
    end: PropTypes.bool,
}

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    .previous {
        border: none;
        background-color: transparent;
        cursor: pointer;
        &:hover {
            opacity: 0.3;
        }
        svg {
            color: white;
            font-size: 2rem;
        }
    }
    .next {
        border: none;
        background-color: transparent;
        cursor: pointer;
        &:hover {
            opacity: 0.3;
        }
        svg {
            color: white;
            font-size: 2rem;
        }
    }
    .active {
        color: white;
        border: none;
        border-radius: 7px; 
        background-color: orange;
        margin: 0.2%;
        cursor: pointer;
        font-size: 1.5rem;
        padding: 5px;
    }
    .inactive {
        color: white;
        border: none;
        border-radius: 10px; 
        background-color: #70378a;
        margin: 0.2%;
        cursor: pointer;
        font-size: 1.5rem;
        padding: 5px;
    }
`;
export default Pagination;