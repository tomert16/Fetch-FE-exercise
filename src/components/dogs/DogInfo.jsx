import { PropTypes } from "prop-types";
import styled from "styled-components";
import { BiLike, BiDislike } from "react-icons/bi"


const DogInfo = ({dog, addToLikedList, isLiked, removeFromLikedList, locations}) => {
 
    const dogLocation = () => {
        const location = locations.find((location) => location.zip_code === dog.zip_code)
        return location ? `${location.city}, ${location.state}` : '';
    }

  return (
    <DogInfoContainer>
        <img src={dog.img} alt={dog.name} />
        <div className="dog-info">
            <h2>{dog.name}</h2>
            <p>Breed: {dog.breed}</p>
            <p>Age: {dog.age}</p>
            {dogLocation() && <p>From: {dogLocation()}</p>}
        </div>
        {isLiked ? <button className="dislike-btn" onClick={() => removeFromLikedList(dog)}>
            <BiDislike />
        </button>
        :
        <button className="like-btn"  onClick={() => addToLikedList(dog)}>
            <BiLike />
        </button>}
    </DogInfoContainer>
  )
}

DogInfo.propTypes = {
    dog: PropTypes.object,
    addToLikedList: PropTypes.func,
    isLiked: PropTypes.bool,
    removeFromLikedList: PropTypes.func,
    locations: PropTypes.array,
}
const DogInfoContainer = styled.div`
    background-color: white;
    border-radius: 10px;
    margin: 1%;
    margin-left: 12%;
    width: 70vw;
    height: fit-content;
    cursor: pointer;
    &:hover {
        box-shadow: 0 0 50px 15px gold;
    }
    @media (min-width: 768px) {
        width: 40vw;
    }
    @media (min-width: 1024px) {
        width: 20vw;
        margin-left: 6%;
    }
    .dog-info {
        margin-left: 5%;
    }
    img {
        height: 30vh;
        width: 100%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        @media (min-width: 768px) {
            width: 20vw;
        }
        @media (min-width: 768px) {
            width: 40vw;
        }
        @media (min-width: 1024px) {
            width: 20vw;
        }
    }
    .like-btn {
        border: none;
        background: transparent;
        cursor: pointer;
        svg {
            font-size: 2rem;
        }
        &:hover {
            color: green;
        }
    }
    .dislike-btn {
        border: none;
        background: transparent;
        cursor: pointer;
        svg {
            font-size: 2rem;
        }
        &:hover {
            color: red;
        }
    }
`;
export default DogInfo;