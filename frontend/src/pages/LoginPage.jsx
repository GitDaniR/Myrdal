import {Link} from 'react-router-dom'

const LoginPage = () => {
    function handleSubmit(e) {
        e.preventDefault();

        console.log("I logged in!");
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
                        <label htmlFor="email"></label>
                        <input type="email" id="email" placeholder="Enter your email" required></input>
                    </div>
                    <div>
                        <label htmlFor="password"></label>
                        <input type="password" id="password" placeholder="Enter your password" required></input>
                    </div>
                    <Link to="/register">Create new account.</Link>
                    <div>
                        <button type="button" onClick={handleSubmit}>Log In</button>
                    </div>
                </form>
            </div>
        </div>
        </>
        
    );
}

export default LoginPage