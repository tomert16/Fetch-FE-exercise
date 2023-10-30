import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { successfullyRemoved } from '../../ui/Toastify';
import LikedListPagination from '../LikedListPagination';
import DogInfo from './DogInfo';

const LikedList = ({ likedList, setLikedList, handleCreateMatch }) => {
    const [amountOfCards, setAmountOfCards] = useState();
    const [currentSet, setCurrentSet] = useState(1);

    const indexOfLastCard = currentSet * amountOfCards;
    const indexOfFirstCard = indexOfLastCard - amountOfCards;
    const nextSlide = () => setCurrentSet(currentSet + 1);
    const previousSlide = () => setCurrentSet(currentSet - 1);
    const end = indexOfLastCard >= likedList.length;
    const beginning = currentSet === 1;

    //function to remove doog from liked list
    const removeFromLikedList = (dog) => {
        const updatedList = likedList.filter((likedDog) => likedDog.id !== dog.id)
        successfullyRemoved(dog);
        setLikedList(updatedList);
    }
    
    useEffect(() => {
        if (window.innerWidth >= 768) {
            setAmountOfCards(4)
        } else {
            setAmountOfCards(1)
        }
    }, [amountOfCards])

  return (
    <LikedListContainer>
        <div className="border"></div>
        <h2>Liked Dogs</h2>
        <button onClick={handleCreateMatch}>Find Match</button>
        <div className="liked-list">
            {likedList.slice(indexOfFirstCard, indexOfLastCard).map((dog) => (
                <DogInfo key={dog.id} dog={dog} isLiked={true} removeFromLikedList={removeFromLikedList}/>
            ))}
        </div>
        <LikedListPagination 
            amount={amountOfCards}
            total={likedList.length}
            next={nextSlide}
            prev={previousSlide}
            end={end}
            beginning={beginning}
        />
        <div className="border"></div>
    </LikedListContainer>
  )
}

LikedList.propTypes = {
    likedList: PropTypes.array,
    handleCreateMatch: PropTypes.func,
    setLikedList: PropTypes.func,
} 

const LikedListContainer = styled.div`
    @media (min-width: 768px) {
        .liked-list {
            display: flex;
        }
    }
    .border {
        border: 1px solid black;
        width: 75vw;
        margin-left: 5%;
        margin: 5%;
    }
`;
export default LikedList;