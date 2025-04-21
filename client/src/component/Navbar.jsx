import React, { useState, useCallback, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { CustomButton } from './';
import { logo, menu, thirdweb } from '../assets';
import { navlinks } from '../constants';
import { useStateContext } from '../context';

const Icon = memo(({ style, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`
      w-[48px] h-[48px] rounded-[10px]
      ${isActive && isActive === name ? 'bg-[#2c2f32]' : ''}
      flex justify-center items-center
      ${!disabled ? 'cursor-pointer hover:opacity-80' : 'opacity-50'}
      transition-opacity duration-200 ${style}
    `}
    onClick={disabled ? undefined : handleClick}
    role={!disabled ? 'button' : undefined}
    aria-label={name}
    tabIndex={!disabled ? 0 : -1}
  >
    <img
      src={imgUrl}
      alt={`${name} icon`}
      className={`w-1/2 h-1/2 ${isActive && isActive !== name ? 'grayscale' : ''}`}
    />
  </div>
));

Icon.displayName = 'Icon';

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();

  const handleNavigation = useCallback((link) => {
    if (!link.disabled) {
      setIsActive(link.name);
      navigate(link.link);
    }
  }, [navigate]);

  const handleButtonClick = useCallback(() => {
    if (address) {
      navigate('create-campaign');
    } else {
      connect();
    }
  }, [address, navigate, connect]);

  const toggleMobileMenu = useCallback(() => {
    setToggleDrawer(prev => !prev);
  }, []);

  const handleMobileNavigation = useCallback((link) => {
    setIsActive(link.name);
    setToggleDrawer(false);
    navigate(link.link);
  }, [navigate]);

  return (
    <nav className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <Link to="/" className="flex-shrink-0">
        <div className="w-[200px] h-[80px] rounded-full flex items-center justify-center">
          <img src={logo} alt="CrowdFunding Logo" className="w-full h-auto object-contain" />
        </div>
      </Link>

      <div className="w-full flex flex-row items-center justify-between px-6 py-4 bg-[#f9f9f9] rounded-[20px] shadow-sm">
        <div className="flex flex-row justify-center items-center gap-6">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => handleNavigation(link)}
            />
          ))}
        </div>


      </div>

      {/* lg device */}
      <div className="sm:flex hidden flex-row justify-end gap-4 py-4">
        <CustomButton
          btnType="button"
          title={address ? 'Create a campaign' : 'Connect'}
          styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
          handleClick={handleButtonClick}
        />


      </div>

      {/* sm menu*/}
      <div className="sm:hidden flex justify-between items-center relative">
        <Link to="/" className="flex-shrink-0">
          <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center">
            <img src={logo} alt="CrowdFunding Logo" className="w-[60%] h-[60%] object-contain" />
          </div>
        </Link>

        <button
          onClick={toggleMobileMenu}
          className="p-2 hover:opacity-80 transition-opacity duration-200"
          aria-label="Toggle mobile menu"
          aria-expanded={toggleDrawer}
        >
          <img
            src={menu}
            alt="Menu"
            className="w-[24px] h-[24px] object-contain"
          />
        </button>

        {/* sm device */}
        <div
          className={`
            absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-lg rounded-b-lg py-4
            ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'}
            transition-all duration-300
          `}
          aria-hidden={!toggleDrawer}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`
                  flex items-center p-4
                  ${isActive === link.name ? 'bg-[#3a3a43]' : 'hover:bg-[#28282e]'}
                  transition-colors duration-200 cursor-pointer
                `}
                onClick={() => handleMobileNavigation(link)}
                role="button"
                tabIndex={0}
                aria-label={link.name}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? '' : 'grayscale'}`}
                />
                <span className={`ml-[20px] font-medium text-[14px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>
                  {link.name}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex justify-center px-4">
            <CustomButton
              btnType="button"
              title={address ? 'Create a campaign' : 'Connect'}
              styles={`w-full ${address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}`}
              handleClick={handleButtonClick}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;