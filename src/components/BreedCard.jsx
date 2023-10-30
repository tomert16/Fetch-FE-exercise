import PropTypes from 'prop-types'
// import { useState } from 'react';
import styled from 'styled-components'

const BreedCard = ({ breed, setSelectedBreed }) => {
    

    const handleSelectedBreed = (breedName) => {
        setSelectedBreed(breedName);
    }

  return (
    <CardContainer onClick={() => handleSelectedBreed(breed)}>
        {breed}
    </CardContainer>
  )
}

BreedCard.propTypes = {
    breed: PropTypes.string,
    setSelectedBreed: PropTypes.func
}

const CardContainer = styled.div`
    cursor: pointer;
    /* width: 12%; */
    /* padding: 0.5rem; */
    /* background-color: purple; */
    /* border: 1px solid black; */
    /* border-radius: 5px; */
    /* color: orange; */
    /* text-align: center; */
    &:hover {
        color: orange;
    }
`;
export default BreedCard