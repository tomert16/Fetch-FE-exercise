import styled from 'styled-components'
import fetchLogo from '/src/assets/fetchLogo.png'

const Header = () => {
  return (
    <HeaderContainer>
        <div className="logo">
            <img src={fetchLogo} alt="logo" />
        </div>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    .logo {
        img {
            height: 5rem;
        }
    }
`;
export default Header