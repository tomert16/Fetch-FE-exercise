import styled from 'styled-components';
import PropTypes from 'prop-types';
import fetchLogo from '../assets/fetchLogo.png';
import { ImSearch } from 'react-icons/im';
import { RiAccountCircleLine } from 'react-icons/ri';
import { useState } from 'react';
import { userLogout } from '../redux/usersSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const NavBar = ({ setSelectedBreed }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputHover, setInputHover] = useState(false);
    const [toggleSearchBar, setToggleSearchBar] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [breedInput, setBreedInput] = useState('');


    //function to toggle the account menu
    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu);
    }

    //function to handle logout request
    const handleLogout = () => {
        dispatch(userLogout());
        navigate('/');
    };

    //function to handle the search input
    const handleBreedSearch = (e) => {
        const input = e.target.value;
        // automatically makes the first letter uppercase when searching for a breed
        setBreedInput(input.charAt(0).toUpperCase() + input.slice(1));
    }

    
  return (
    <NavBarContainer>
        <div className="left">
            <div className="brand-logo">
                <img src={fetchLogo} alt="logo" />
            </div>
        </div>
        <div className="right">
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
                    placeholder='Search...'
                    onMouseEnter={() => setInputHover(true)}
                    onMouseLeave={() => setInputHover(false)}
                    onBlur={() => {
                        setToggleSearchBar(false);
                        setInputHover(false);
                    }}
                    value={breedInput}
                    onChange={handleBreedSearch}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            setSelectedBreed(breedInput)
                        }
                    }}
                />
            </div>
            <div className="account-icon">
                <button onClick={handleToggleMenu}>
                    <RiAccountCircleLine />
                </button>
            </div>
            <div className="account-menu">
            {toggleMenu ? 
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button> 
                : 
                null
            }
            </div>
        </div>
    </NavBarContainer>
  )
}

NavBar.propTypes = {
    setSelectedBreed: PropTypes.func
}

const NavBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    height: 12vh;
    width: 100vw;
    z-index: 2;
    padding: 0 -6rem;
    top: 0;
    transition: 0.2s ease-in-out;
    .left {
        display: flex;
        align-items: center;
        .brand-logo {
            display: flex;
            justify-content: center;
            margin: 15%;
            @media (min-width: 320px) {
                margin: 0%;
            }
            img {
                height: 10vh;
                @media (max-width: 320px) {
                    height: 8vh;
                }
            }
        }
    }
    .right {
        display: flex;
        align-items: center;
        margin: 2%;
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
            input {
                width: 100%;
                opacity: 1;
                visibility: visible;
                padding: 0.3rem;
            }
        }
        .account-icon {
            button {
                background-color: transparent;
                border: none;
                cursor: pointer;
                svg {
                    font-size: 1.5rem;
                }
                svg:hover {
                    color: orange;
                }
            }
        }
        .account-menu {
            display: flex;
            flex-direction: column;
            .logout-btn {
                background-color: transparent;
                border: none;
                font-size: 1rem;
                cursor: pointer;
            }
            .logout-btn:hover {
                color: orange;
            }
        }
    }
`;
export default NavBar