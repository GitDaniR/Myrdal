import axios from "axios";
import {Link, useNavigate} from 'react-router-dom'
import ToastContext from "../../utils/ToastContext";
import { useContext } from "react";

const RegistrationForm = () => {
    const navigate = useNavigate();
    const showToast = useContext(ToastContext);

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries());
    
        axios
            .post("/api/auth/users/", user)
            .then(() => {
                showToast('success', "Registration successful.");
                setTimeout(() => {showToast('info', "Now you can login.")}, 1);
                navigate('/');
            })
            .catch((error) => {
                showToast('error', error.message);
            });
    }

    return (
        <div className='form-container'>
            <form className='form-block' onSubmit={handleRegisterSubmit}>
                <label htmlFor="email" className="block">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required className='input-field'></input>
                <label htmlFor="password" className="block">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required className='input-field'></input>
                <label htmlFor="firstName" className="block">First name</label>
                <input id="firstName" name="first_name" placeholder="Enter your first name" required className='input-field'></input>
                <label htmlFor="lastName" className="block">Last name</label>
                <input id="lastName" name="last_name" placeholder="Enter your last name" required className='input-field'></input>
                <label htmlFor="dateOfBirth" className="block">Date of birth</label>
                <input type="date" id="dateOfBirth" name="date_of_birth" required className="input-field"></input>
                <Link to="/" className="hyperlink">Back to login</Link>
                <button type="submit" className="form-btn">Sign Up</button>
            </form>
        </div>
    )
}

export default RegistrationForm