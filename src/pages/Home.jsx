import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import DogInfo from '../components/dogs/DogInfo';
import NavBar from '../components/NavBar';
import { createMatch, fetchDogData, fetchDogs, resetMatch, selectDogData, selectDogs, selectMatch} from '../redux/dogsSlice';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import LikedList from '../components/likedList/LikedList';
import MatchCard from '../components/dogs/MatchCard';
import { ToastContainer } from 'react-toastify';
import { successfullyAdded, unableToAdd, unableToCreateMatch, unableToGetData } from '../ui/Toastify';
import { BsArrowUpCircle } from 'react-icons/bs';
import { fetchLocations, selectLocations } from '../redux/locationsSlice';


const Home = () => {
    const dispatch = useDispatch();
    const dogs = useSelector(selectDogs);
    const dogData = useSelector(selectDogData);
    const matchedDog = useSelector(selectMatch);
    const locations = useSelector(selectLocations);
    const [currentSet, setCurrentSet] = useState(1);
    const [selectedBreed, setSelectedBreed] = useState([]);
    const [age, setAge] = useState({
        ageMin: '',
        ageMax: '',
    });
    const [breedSort, setBreedSort] = useState('asc');
    const [likedList, setLikedList] = useState([]);

    // fetch dogs by filters
    useEffect(() => {
        try {
            let params = {
                breeds: selectedBreed,
                ageMin: age.ageMin,
                ageMax: age.ageMax,
                from: (currentSet - 1) * 25,
                sort: `breed:${breedSort}`
            };
            if (selectedBreed === 'all') {
                dispatch(fetchDogs());
            }
                dispatch(fetchDogs(params));
        } catch (err) {
            console.error('Unable to search for dogs', err)
            unableToGetData();
        }
    }, [dispatch, selectedBreed, age.ageMin, age.ageMax, currentSet, breedSort]);

    // fetch dog data
    useEffect(() => {
        try {
            if (dogs?.resultIds?.length > 0) {
                const resultIds = dogs?.resultIds?.map((dog) => dog);
                dispatch(fetchDogData(resultIds));
            } 
        }catch {
            unableToGetData();
        }
    }, [dispatch, dogs]);

    //fetch the locations of dogs
    useEffect(() => {
        const mappedDogData = dogData.map((dog) => dog.zip_code)
        const zipCodes = [...new Set(mappedDogData)]
        dispatch(fetchLocations(zipCodes));
    }, [dispatch, dogData]);

    //function to add dogs to liked list
    const addToLikedList = (dog) => {
        try {
            const likedDog = dog;
            setLikedList([...likedList, likedDog]);
            successfullyAdded(dog);
        } catch (err) {
            unableToAdd(dog)
        }
    }
    //function to find and create a match
    const handleCreateMatch = () => {
        try {
            dispatch(createMatch(likedList));
            setLikedList([]);
        } catch (err) {
            unableToCreateMatch();
        }
    };
    
    if (locations === undefined) return null;
    const filteredLocations = locations.filter((location) => location !== null);


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
    };

  return (
    <HomeContainer>
        <NavBar setSelectedBreed={setSelectedBreed}/>
        <ToastContainer />
        <h1>Find Your New Friend Today at the Fetch Dog Shelter 🐶!</h1>
        <div className="home-body">
            <Filters setSelectedBreed={setSelectedBreed} age={age} setAge={setAge} setBreedSort={setBreedSort}/>
                <div className="dog-lists-contianer">
                    {likedList.length > 0 && <LikedList likedList={likedList} setLikedList={setLikedList} handleCreateMatch={handleCreateMatch} locations={filteredLocations}/>}
                    <div className="dog-cards">
                        {dogData.map((dog) => (
                            <DogInfo key={dog.id} dog={dog} addToLikedList={addToLikedList} locations={filteredLocations}/>
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
        {matchedDog && <MatchCard matchedDog={matchedDog.match} closeMatchCard={closeMatchCard} locations={filteredLocations}/>}
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
    h1 {
        text-align: center;
        color: white;
        @media (min-width: 768px) {
            font-size: 1.8rem;
            width: 50%;
            margin-left: 30%;
        }
        @media (max-width: 767px) {
            font-size: 1.7rem;
        }
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
      color: white;
      font-size: 3rem;
    }
  }
  .hide-btn {
    display: none;
  }
`;
export default Home