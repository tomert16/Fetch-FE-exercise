import { useState } from 'react'
import styled from 'styled-components';
import { ImSearch } from 'react-icons/im';


const SearchBar = () => {
    const [inputHover, setInputHover] = useState(false);
    const [toggleSearchBar, setToggleSearchBar] = useState(false);
    const [breedInput, setBreedInput] = useState('');


  return (
    <SearchBarContainer>
        <div className={`search ${toggleSearchBar ? 'show-search' : ''}`}>
                <button
                    onFocus={() => setToggleSearchBar(true)}
                    onBlur={() => {
                        if (!inputHover) {
                            setToggleSearchBar(false);
                        }
                    }}
                >
                    <ImSearch />
                </button>
                <input 
                    type="text" 
                    placeholder='Search breed...'
                    onMouseEnter={() => setInputHover(true)}
                    onMouseLeave={() => setInputHover(false)}
                    onBlur={() => {
                        setToggleSearchBar(false);
                        setInputHover(false);
                    }}
                    value={breedInput}
                    onChange={(e) => setBreedInput(e.target.value)}
                    // onSubmit={}
                />
            </div>
    </SearchBarContainer>
  )
}

const SearchBarContainer = styled.div`
    .search {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
            padding: 0.2rem;
            padding-left: 0.5rem;
            button {
                cursor: pointer;
                background-color: transparent;
                border: none;
                &:focus {
                    outline: none;
                }
                svg {
                    color: black;
                    font-size: 1.5rem;
                }
                svg:hover {
                    color: orange;
                }
            }
        }
        input {
            width: 0;
            opacity: 0;
            visibility: hidden;
            transition: 0.3s ease-in-out;
            background-color: transparent;
            border: none;
            &:focus {
                outline: none;
            }
        }
        .show-search {
            border: 1px solid purple;
            /* background-color: rgba(0, 0, 0, 0.6); */
            input {
                width: 100%;
                opacity: 1;
                visibility: visible;
                padding: 0.3rem;
            }
        }
`;
export default SearchBar;