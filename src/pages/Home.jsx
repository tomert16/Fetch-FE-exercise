import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import DogInfo from '../components/dogs/DogInfo';
import NavBar from '../components/NavBar';
import { createMatch, fetchDogData, fetchDogs, resetMatch, selectDogData, selectDogs, selectMatch } from '../redux/dogsSlice';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import LikedList from '../components/dogs/LikedList';
import MatchCard from '../components/MatchCard';
import { ToastContainer } from 'react-toastify';
import { successfullyAdded, unableToCreateMatch, unableToGetData } from '../ui/Toastify';
import { BsArrowUpCircle } from 'react-icons/bs';


const Home = () => {
    const dispatch = useDispatch();
    const dogs = useSelector(selectDogs);
    const dogData = useSelector(selectDogData);
    const matchedDog = useSelector(selectMatch);
    const [currentSet, setCurrentSet] = useState(1);
    const [selectedBreed, setSelectedBreed] = useState([]);
    const [age, setAge] = useState({
        ageMin: '',
        ageMax: '',
    })
    const [likedList, setLikedList] = useState([]);

    // fetch dogs by filters
    useEffect(() => {
        try {
            let params = {
                breeds: selectedBreed,
                ageMin: age.ageMin,
                ageMax: age.ageMax,
                from: (currentSet - 1) * 25,
            };
            if (selectedBreed === 'all') {
                dispatch(fetchDogs());
            }
                dispatch(fetchDogs(params));
        } catch (err) {
            console.error('Unable to search for dogs', err)
            unableToGetData();
        }
    }, [dispatch, selectedBreed, age.ageMin, age.ageMax, currentSet]);

    // fetch dog data
    useEffect(() => {
        if (dogs?.resultIds?.length > 0) {
            const resultIds = dogs?.resultIds?.map((dog) => dog);
            dispatch(fetchDogData(resultIds));
        }
    }, [dispatch, dogs]);



    const addToLikedList = (dog) => {
        try {
            const likedDog = dog;
            setLikedList([...likedList, likedDog]);
            successfullyAdded(dog);
        } catch (err) {
            console.log('Unable to add to liked list', err)
        }
    }

    const handleCreateMatch = () => {
        try {
            dispatch(createMatch(likedList));
            setLikedList([]);
        } catch (err) {
            unableToCreateMatch();
        }
    };
    
    // // Varibles and values for pagination functionality
    const indexOfLastDog = currentSet * dogs?.resultIds?.length;
    // // Varibles to handle next and previous sets
    const nextSet = () => setCurrentSet(currentSet + 1);
    const previousSet = () => setCurrentSet(currentSet - 1);
    const end = indexOfLastDog >= dogs.total;
    const beginning = currentSet === 1;

    const closeMatchCard = () => {
        dispatch(resetMatch())
    };

    //function to scroll back to the top of the page
    const handleScrollToTop = () => {
        //for safari
        document.body.scrollTop = 0;
        //for chrome, firefox, and other browsers
        document.documentElement.scrollTop = 0;
    }

  return (
    <HomeContainer>
        <NavBar setSelectedBreed={setSelectedBreed}/>
        <ToastContainer />
        <h1>Find Your New Friend Today!</h1>
        <div className="home-body">
            <Filters setSelectedBreed={setSelectedBreed} age={age} setAge={setAge}/>
                <div className="dog-lists-contianer">
                    {likedList.length > 0 && <LikedList likedList={likedList} setLikedList={setLikedList} handleCreateMatch={handleCreateMatch}/>}
                    <div className="dog-cards">
                        {dogData.map((dog) => (
                            <DogInfo key={dog.id} dog={dog} addToLikedList={addToLikedList}/>
                            ))}
                    </div>
                </div> 
        </div>
        <Pagination 
            currentSet={currentSet}
            setCurrentSet={setCurrentSet}
            total={dogs.total}
            amount={dogs?.resultIds?.length}
            next={nextSet}
            prev={previousSet}
            beginning={beginning}
            end={end}
        />
        <button className={document.body.scrollTop >= 20 || document.documentElement.scrollTop >= 20 ? 'display-btn' : 'hide-btn'} onClick={handleScrollToTop}>
            <BsArrowUpCircle />
        </button>
        {matchedDog && <MatchCard matchedDog={matchedDog.match} closeMatchCard={closeMatchCard}/>}
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
    h1 {
        text-align: center;
    }
    .liked-dogs-list {
        display: flex;
    }
    .home-body {
        display: flex;
        @media (max-width: 767px) {
            flex-direction: column;
        }
        
    }
    .dog-lists-container {
        display: flex;
        flex-direction: column;
    }
    .dog-cards{
        display: flex;
        flex-wrap: wrap;
        gap: 0rem;
    }
    .pagination {
        display: flex;
        justify-content: center;
    }
    .btn {
        width: 165px;
        height: 50px;
        border-radius: 5px;
        border: none;
        transition: all 0.5s ease-in-out;
        font-size: 20px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-weight: 600;
        display: flex;
        align-items: center;
        background: #040f16;
        color: #f5f5f5;
    }

    .btn:hover {
        box-shadow: 0 0 20px 0px #2e2e2e3a;
    }

    .btn .icon {
        position: absolute;
        height: 40px;
        width: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.5s;
    }

    .btn .text {
        transform: translateX(55px);
    }

    .btn:hover .icon {
        width: 175px;
    }

    .btn:hover .text {
        transition: all 0.5s;
        opacity: 0;
    }

    .btn:focus {
        outline: none;
    }

    .btn:active .icon {
        transform: scale(0.85);
    }
    .display-btn {
    position: fixed;
    bottom: 0;
    right: 2%;
    background: transparent;
    border: none;
    cursor: pointer;
    svg {
      color: orange;
      font-size: 3rem;
    }
  }
  .hide-btn {
    display: none;
  }
`;
export default Home