import {Link} from 'react-router-dom'

const handleLoginSubmit = (e) => {
    e.preventDefault();

    console.log("I logged in!");
}

const LoginForm = () => {
    return (
        <div className='form-container'>
            <form className='form-block'>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" required className="input-field"></input>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password" required className="input-field"></input>
                <Link to="/register" className="hyperlink">Create new account</Link>
                <button type="button" onClick={handleLoginSubmit} className="form-btn">Log In</button>
            </form>
        </div>
    );
}

export default LoginForm