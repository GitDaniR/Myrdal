import axios from "axios";
import {Link} from 'react-router-dom'

const handleLoginSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const loginInfo = Object.fromEntries(formData.entries());

    axios
        .post("/api/auth/jwt/create/", loginInfo)
        .then((response) => {
            console.log(response.status + ", I logged in!")
        })
        .catch((error) => {
            console.log(error.message)
        });
}

const LoginForm = () => {
    return (
        <div className='form-container'>
            <form className='form-block' onSubmit={handleLoginSubmit}>
                <label htmlFor="email" className="block">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required className='input-field'></input>
                <label htmlFor="password" className="block">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required className='input-field'></input>
                <Link to="/register" className="hyperlink">Create new account</Link>
                <button type="submit" className="form-btn">Log In</button>
            </form>
        </div>
    );
}

export default LoginForm