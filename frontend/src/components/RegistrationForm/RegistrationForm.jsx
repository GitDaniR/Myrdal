const handleRegisterSubmit = (e) => {
    e.preventDefault();

    console.log("I registered!");
}

const RegistrationForm = () => {
    return (
        <div className='form-container'>
            <form className='form-block'>
                <label htmlFor="email" className="block">Email</label>
                <input type="email" id="email" placeholder="Enter your email" required  className='input-field'></input>
                <label htmlFor="password" className="block">Password</label>
                <input type="password" id="password" placeholder="Enter your password" required  className='input-field'></input>
                <label htmlFor="firstName">First name</label>
                <input id="firstName" placeholder="Enter your first name" required className='input-field'></input>
                <label htmlFor="lastName">Last name</label>
                <input id="lastName" placeholder="Enter your last name" required className='input-field'></input>
                <label htmlFor="dateOfBirth">Date of birth</label>
                <input type="date" id="dateOfBirth" required className="input-field"></input>
                <button type="button" onClick={handleRegisterSubmit} className="form-btn">Sign Up</button>
            </form>
        </div>
    )
}

export default RegistrationForm