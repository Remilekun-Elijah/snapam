import React from 'react';
import { ILocation, ILogo } from '../utils/icons';


const Header = () => {

 return (
  <div >
    <header className='bg-black flex items-center justify-between w-full sm:static fixe sm:mb-0'>
     <img src={ILogo} alt="" className='sm:w-[170px] sm:h-full w-[100px] h-[80px]' />
     
     
     <div className='text-white w-full'>
      <h1 className='sm:text-8xl text-2xl text-center aharoni pb-0 mb-0'>SNAPAM</h1>
      <p className='sm:text-xl text-[12px] text-center mt-0 pt-0 aharoni'>Lagos’s Street waste Report Identifier</p>
     </div>

     <div className='sm:w-[140px]'>
     <img src={ILocation} alt=""  className='bg-white sm:w-full w-[100px] sm:h-full h-[80px]'/>
     </div>

    </header>
  </div>
 );
}

export default Header;
