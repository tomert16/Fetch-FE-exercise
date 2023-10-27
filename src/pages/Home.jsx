import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchDogBreeds, selectDogBreeds } from '../redux/dogsSlice';

const Home = () => {
const dispatch = useDispatch();
const dogBreeds = useSelector(selectDogBreeds);

//useEffect function to fetch the dog breeds and display them
useEffect(() => {
    dispatch(fetchDogBreeds());
}, [dispatch]);

  return (
    <HomeContainer>
        Home
        {dogBreeds.map((breed, index) => (
            <p key={index}>{breed}</p>
        ))}
    </HomeContainer>
  )
}

const HomeContainer = styled.div``;
export default Home