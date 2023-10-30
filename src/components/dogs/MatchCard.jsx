import PropTypes from 'prop-types'
import styled from 'styled-components'
import { RiCloseCircleLine } from 'react-icons/ri';

const MatchCard = ({ matchedDog, closeMatchCard, locations }) => {
    const dogLocation = locations.find((location) => location.zip_code === matchedDog.zip_code)

  return (
    <MatchCardContainer>
        <div className="card-container">
            <button className="exit-btn" onClick={closeMatchCard}>
                <RiCloseCircleLine />
            </button>
            <h1 className="match-prompt">We Found a Match🐶!!</h1>
            <img src={matchedDog.img} alt={matchedDog.name} />
            <div className="dog-info">
                <h2>{matchedDog.name}</h2>
                <p>Breed: {matchedDog.breed}</p>
                <p>Age: {matchedDog.age}</p>
                {dogLocation && <p>From: {dogLocation.city}, {dogLocation.state}</p>}
            </div>
        </div>
    </MatchCardContainer>
  )
}

MatchCard.propTypes = {
    matchedDog: PropTypes.object,
    closeMatchCard: PropTypes.func, 
    locations: PropTypes.array,
}

const MatchCardContainer = styled.div`
    border-style: solid;
    border-radius: 3px;
    border-color: black;
    position: relative;
    background: rgba(0,0,0,.5);
    height: 100vh;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 1000;
    overflow-x: scroll;
    text-align: center;
    .match-prompt{
        color: black;
    }
    .card-container {
        transform: translate(12%, 13%);
        background-color: white;
        border-radius: 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 70vw;
        height: fit-content;
        cursor: pointer;
        box-shadow: 0 0 60px 30px gold;
        @media (min-width: 1024px) {
            width: 25vw;
        }
        .dog-info {
            margin-left: 5%;
        }
        img {
            height: 40vh;
            width: 100%;
        }
        .exit-btn {
            background-color: transparent;
            border: none;
            display: flex;
            cursor: pointer;
            svg {
                font-size: 2rem;
            }
        }
    }
`;
export default MatchCard