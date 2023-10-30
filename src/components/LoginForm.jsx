import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { userLogin } from "../redux/usersSlice";


const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
    });
    const [error, setError] = useState(null);

    //function to handle the login functionality
    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            if (!formValues.name || !formValues.email) {
                throw new Error('Please fill in all the fields')
            }
            await dispatch(userLogin({ name: formValues.name, email: formValues.email}));
            navigate('/home');
        } catch (err) {
            setError(err.message);
        }
    }

  return (
    <FormContainer>
        <form className="form" onSubmit={handleLogin}>
            <p className="form-title">Sign in to your account</p>
            {error && <p className="error-message">{error}</p>}
                <div className="input-container">
                <input type="text" name="name" placeholder="Enter name" value={formValues.name} onChange={(e) => setFormValues({...formValues, [e.target.name]: e.target.value})}/>
                <span>
                </span>
            </div>
            <div className="input-container">
                <input type="email" name="email" placeholder="Enter email" value={formValues.email} onChange={(e) => setFormValues({...formValues, [e.target.name]: e.target.value})}/>
            </div>
            <button type="submit" className="submit">
                Sign in
            </button>
        </form>
    </FormContainer>
  )
}

const FormContainer = styled.div`
    @media (min-width: 786px) {
        .form {
            width: 30%;
        } 
    }
    .form {
        background-color: #fff;
        display: block;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .form-title {
        font-size: 1.25rem;
        line-height: 1.75rem;
        font-weight: 600;
        text-align: center;
        color: #000;
    }

    .input-container {
        position: relative;
    }

    .input-container input, .form button {
        outline: none;
        border: 1px solid #e5e7eb;
        margin: 8px 0;
    }

    .input-container input {
        background-color: #fff;
        padding: 1rem;
        padding-right: 3rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        width: 52vw;
        border-radius: 0.5rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        @media (min-width: 768px) {
            width: 61vw;
        }
        @media (min-width: 1024px) {
            width: 25vw;
        }
    }

    .submit {
        display: block;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        background-color: orange;
        color: #ffffff;
        font-size: 0.875rem;
        line-height: 1.25rem;
        font-weight: 500;
        width: 100%;
        border-radius: 0.5rem;
        text-transform: uppercase;
        cursor: pointer;
    }
    .error-message {
        color: red;
        text-align: center;
    }
`;
export default LoginForm;