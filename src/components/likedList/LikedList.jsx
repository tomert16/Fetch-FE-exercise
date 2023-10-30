import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { successfullyRemoved } from '../../ui/Toastify';
import LikedListPagination from './LikedListPagination';
import DogInfo from '../dogs/DogInfo';

const LikedList = ({ likedList, setLikedList, handleCreateMatch, locations }) => {
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
            setAmountOfCards(3)
        } else {
            setAmountOfCards(1)
        }
    }, [amountOfCards])

  return (
    <LikedListContainer>
        <div className="border"></div>
        <h2 className="list-header">Your Favorite Dogs</h2>
        <div className="liked-list">
            {likedList.slice(indexOfFirstCard, indexOfLastCard).map((dog) => (
                <DogInfo key={dog.id} dog={dog} isLiked={true} removeFromLikedList={removeFromLikedList} locations={locations}/>
                ))}
        </div>
        <button className="button" onClick={handleCreateMatch}>Find Match!</button>
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
    locations: PropTypes.array,
} 

const LikedListContainer = styled.div`
    @media (min-width: 768px) {
        .liked-list {
            display: flex;
        }
    }
    .list-header {
        text-align: center;
        color: white;
        font-size: 2.5rem;
        text-decoration: underline;
    }
    .border {
        border: 1px solid black;
        width: 75vw;
        margin-left: 5%;
        margin: 5%;
    }
    .button {
        margin-left: 80%;
        border-radius: 10px;
        font-size: 1.4rem;
        background-color: white;
        border: none;
        &:hover {
            box-shadow: 0 0 60px 30px purple;
        }
        @media (max-width: 768px) {
            margin-left:  30%;
            margin-top: 5%;
        }
    }
`;
export default LikedList;