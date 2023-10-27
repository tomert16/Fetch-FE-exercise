import styled from "styled-components";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";

const Landing = () => {
  return (
    <LandingContainer>
        <Header />
        <LoginForm />
    </LandingContainer>
  )
}

const LandingContainer = styled.div`
    h1 {
        margin: 0%;
    }
`;
export default Landing;