import PropTypes from 'prop-types';

const BasePage = ({ children }) => {
    return (
        <div className="container mx-auto flex justify-between px-36 py-32">
            <div className='mt-7 space-y-2'>
                <label className='block text-[#22c55e] text-6xl'>Myrdal</label>
                <label className="block max-w-80 text-3xl text-wrap">Managing your finances has never been easier.</label>
            </div>
            { children }
        </div>
    );
}
BasePage.propTypes = {
    children: PropTypes.element.isRequired
}

export default BasePage