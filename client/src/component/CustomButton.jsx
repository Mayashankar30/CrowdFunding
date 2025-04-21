


import React from 'react';

const CustomButton = ({ btnType, title, handleClick, styles }) => {
  return (
    <div className="flex justify-center">
      <button
        type={btnType}
        className={`text-white font-semibold text-lg  py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none ${styles}`}
        onClick={handleClick}
      >
        {title}
      </button>
    </div>
  );
};

export default CustomButton;
