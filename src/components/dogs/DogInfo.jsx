import { PropTypes } from "prop-types";
import styled from "styled-components";
import { BiLike, BiDislike } from "react-icons/bi"


const DogInfo = ({dog, addToLikedList, isLiked, removeFromLikedList}) => {

  return (
    <DogInfoContainer>
        <img src={dog.img} alt={dog.name} />
        <div className="dog-info">
            <h2>{dog.name}</h2>
            <p>Breed: {dog.breed}</p>
            <p>Age: {dog.age}</p>
        </div>
        {/* <div title="Like" className="heart-container">
            <input id="Give-It-An-Id" className="checkbox" type="checkbox" onClick={() => addToLikedList(dog)}/>
            <div className="svg-container">
                <svg xmlns="http://www.w3.org/2000/svg" className="svg-outline" viewBox="0 0 24 24">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                    </path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="svg-filled" viewBox="0 0 24 24">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                    </path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" className="svg-celebrate">
                    <polygon points="10,10 20,20"></polygon>
                    <polygon points="10,50 20,50"></polygon>
                    <polygon points="20,80 30,70"></polygon>
                    <polygon points="90,10 80,20"></polygon>
                    <polygon points="90,50 80,50"></polygon>
                    <polygon points="80,80 70,70"></polygon>
                </svg>
            </div>
        </div> */}
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
}
const DogInfoContainer = styled.div`
    background-color: white;
    border-radius: 10px;
    margin: 1%;
    margin-left: 12%;
    /* text-align: center; */
    width: 70vw;
    height: fit-content;
    cursor: pointer;
    &:hover {
        box-shadow: 0 0 50px 15px gold;
    }
    /* gap: 0.4rem; */
    @media (min-width: 768px) {
        width: 15vw;
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
            width: 15vw;
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