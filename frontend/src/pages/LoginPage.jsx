import {Link} from 'react-router-dom'

const LoginPage = () => {
    function handleSubmit(e) {
        e.preventDefault();

        console.log("I logged in!");
    }

    return (
        <div className="container mx-auto flex justify-between px-36 py-48">
            <div className='mt-7 space-y-2'>
                <label className='block text-[#22c55e] text-6xl'>Myrdal</label>
                <label className="block max-w-80 text-3xl text-wrap">Managing your finances has never been easier.</label>
            </div>
            <div className='shadow-lg rounded-lg bg-white text-xl p-12'>
                <form className='space-y-1.5'>
                    <label htmlFor="email" className="block">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" required className="block border-2 rounded-lg p-1"></input>
                    <label htmlFor="password" className="block">Password</label>
                    <input type="password" id="password" placeholder="Enter your password" required className="block border-2 rounded-lg p-1"></input>
                    <Link to="/register" className="block text-sm text-center underline text-blue-600 hover:text-blue-800">Create new account</Link>
                    <button type="button" onClick={handleSubmit} className="block border-2 rounded-lg mx-auto px-12 py-1 bg-[#22c55e] hover:bg-[#15803d] delay-50 duration-300 ease-in-out text-white">Log In</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage