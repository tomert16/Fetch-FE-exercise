import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchDogBreeds, selectDogBreeds, sortedDogs } from '../redux/dogsSlice';

const Filters = ({setSelectedBreed, age, setAge}) => {
    const dispatch = useDispatch();
    const dogBreeds = useSelector(selectDogBreeds);


     //useEffect function to fetch the dog breeds and display them
     useEffect(() => {
        dispatch(fetchDogBreeds());
    }, [dispatch]);

    const handleSortDropdown = (e) => {
        const dropdownValue  = e.target.value;
        dispatch(sortedDogs({ dropdown: dropdownValue }));
    }

  return (
    <FiltersContainer>
        {/* <div className="dropdowns-container"> */}
            <div className="breed-filter">
                <label>Breed:</label>
                <select name="" id="" onChange={(e) => setSelectedBreed(e.target.value)}>
                    <option value="all">All</option>
                    {dogBreeds.map((breed, index) => (
                        <option key={index} value={breed}>{breed}</option>
                        ))}
                </select>
            </div>
            <div className="sort-dropdown">
                <label>Sort By:</label>
                <select name="" id="" onChange={handleSortDropdown}>
                    <option value='none'></option>
                    <option value="nameAsc">Names: A-Z</option>
                    <option value="nameDesc">Names: Z-A</option>
                    <option value="ageAsc">Ages: Youngest-Oldest</option>
                    <option value="ageDesc">Ages: Oldest-Youngest</option>
                    <option value="breedAsc">Breed: A-Z</option>
                    <option value="breedDesc">Breed: Z-A</option>
                </select>
            </div>
        {/* </div> */}
        <div className="age-filter">
            {/* <label>Age:</label> */}
            <div className="form__group field">
                <input type="text" name="ageMin" className="form__field" placeholder="Enter minimum age..." value={age.ageMin} onChange={(e) => setAge({...age, [e.target.name]: e.target.value})} />
                <label className="form__label">Minimum Age</label>
            </div>
            <div className="form__group field">
                <input type="text" name="ageMax" className="form__field" placeholder="Enter maximum age..." value={age.ageMax} onChange={(e) => setAge({...age, [e.target.name]: e.target.value})} />
                <label className="form__label">Maximum Age</label>
            </div>
        </div>
    </FiltersContainer>
  )
}

Filters.propTypes = {
    setSelectedBreed: PropTypes.func,
    setAge: PropTypes.func,
    age: PropTypes.object,
}

const FiltersContainer = styled.div`
    @media (max-width: 767px) {
        height: 20vh;
        width: 100vw;
        bottom: 1rem;
    }
    display: flex;
    flex-direction: column;
    background-color: purple;
    width: min-content;
    height: 100vh;
    padding: 1%;
    position: relative;
    bottom: 5.7rem;
    label {
        color: white;
        font-size: 1.3rem;
    }
    .breed-filter {
        /* display: flex; */
        flex-direction: column;
        select { 
            width: fit-content;
        }
    }
    .age-filter {
        @media (max-width: 767px) {
            display: flex
        }
        gap: 1rem;
        .form__group {
  position: relative;
  padding: 20px 0 0;
  width: 100%;
  max-width: 180px;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: none;
  border-bottom: 2px solid #ffff;
  outline: 0;
  font-size: 17px;
  color: #fff;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
}

.form__field::placeholder {
  color: transparent;
}

.form__field:placeholder-shown ~ .form__label {
  font-size: 17px;
  cursor: text;
  top: 20px;
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 17px;
  color: white;
  pointer-events: none;
}

.form__field:focus {
  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, #b57105, #edb45e);
  border-image-slice: 1;
}

.form__field:focus ~ .form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 17px;
  color: #edb45e;
  font-weight: 700;
}

/* reset input */
.form__field:required, .form__field:invalid {
  box-shadow: none;
}
    }
`;
export default Filters