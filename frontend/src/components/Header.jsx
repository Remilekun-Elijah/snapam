import React from 'react';
import { IBrand, ILogo } from '../utils/icons';
import { useNavigate } from 'react-router-dom';


const Header = () => {
const navigate = useNavigate()
 return (
  <div >
    <header className='bg-black flex items-center justify-between w-full sm:static fixe sm:mb-0'>
     <img src={ILogo} alt="" onClick={_=> navigate(-1)} className='sm-[150px] md:w-[170px]  md:h-full w-[100px] h-[80px]' />
     
     
     {/* <div className='text-white w-full'>
      <h1 className='sm:text-8xl text-2xl text-center aharoni pb-0 mb-0'>SNAPAM</h1>
     </div> */}

     <div className='text-white flex-col items-center flex justify-center'>
     <div className='flex items-center'>
     <img src={IBrand} alt=""  className='md:w-[140px]  w-[100px] sm:h-full h-[50px]'/>
     <h1 className='sm:text-3xl md:text-7xl text-2xl philosopher'><span className="text-[yellow]">SNA</span><span className="text-[green]">PAM</span></h1>
     </div> 

     <p className='md:text-lg text-[10px] mt-0 pt-0 amasis'>An initiative to locate and remove street waste
</p>
     </div>

    </header>
  </div>
 );
}

export default Header;
