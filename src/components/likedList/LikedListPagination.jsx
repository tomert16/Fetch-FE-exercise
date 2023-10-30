import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BsArrowRightCircle, BsArrowLeftCircle } from 'react-icons/bs';


const LikedListPagination = ({ amount, total, end, beginning, prev, next}) => {
    const slide = [];
    for (let i = 0; i < Math.ceil(total / amount ); i++) {
        slide.push(i);
    }

  return (
    <PaginationContainer>
        <button className="back-btn" onClick={() => prev()} disabled={beginning}>
            <BsArrowLeftCircle />
        </button>
        <button className="next-btn" onClick={() =>next()} disabled={end}>
            <BsArrowRightCircle />
        </button>
    </PaginationContainer>
  )
}

LikedListPagination.propTypes = {
    amount: PropTypes.number,
    total: PropTypes.number,
    end: PropTypes.bool,
    beginning: PropTypes.bool,
    next: PropTypes.func,
    prev: PropTypes.func,
}

const PaginationContainer = styled.div`
    display: flex;
    justify-content: space-between;
    transform: translate(0, -800%);
    .back-btn {
        background: transparent;
        border: none;
        svg{
            color: white;
            font-size: 2rem;
        }
    }
    .next-btn {
        background: transparent;
        border: none;
        svg{
            color: white;
            font-size: 2rem;
        }
    }
`;
export default LikedListPagination;