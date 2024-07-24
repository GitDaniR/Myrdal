const RegistrationPage = () => {
    function handleSubmit(e) {
        e.preventDefault();

        console.log("I registered!");
    }

    return (
        <>
        <div>
            <div>
                <label>Myrdal</label>
                <label>Managing your finances has never been easier.</label>
            </div>
            <div>
                <form>
                    <div>
                        <label htmlFor="firstName">First name</label>
                        <input id="firstName" placeholder="Enter your first name" required></input>
                    </div>
                    <div>
                        <label htmlFor="lastName">Last name</label>
                        <input id="lastName" placeholder="Enter your last name" required></input>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" required></input>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" required></input>
                    </div>
                    <div>
                        <label htmlFor="dateOfBirth">Date of birth</label>
                        <input type="date" id="dateOfBirth" required></input>
                    </div>
                    <div>
                        <button type="button" onClick={handleSubmit}>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
        </>
        
    );
}

export default RegistrationPage