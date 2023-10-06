import React from 'react';
import { IWaste } from '../utils/icons';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
 const navigate = useNavigate()
 return (
  <div>
    <Header />

    <main className='sm:pt-0'>
     <section className='flex lg:flex-nowrap flex-wrap'>
     <div className="border-t-2 border-gray-400 w-full lg:w-fit">
      <div className="flex lg:py-3 py-10 flex-col sm:bg-gradient-to-t sm:from-black sm:to-white justify-center bg-black items-center text-white sm:h-[80%] h-full text-center" >
       <div className='sm:text-3xl text-md amasis text-center'>
       <p>Have you seen waste in your neighborhood???</p>
       <p className='mt-5 sm:text-3xl text-lg sm:text-white text-yellow-200 sm:capitalize uppercase'>Report it</p>
       </div>

      </div>
      <div className="flex justify-center w-full">

       <button onClick={_=> navigate("/report")} className='bg-red-500 text-white shadow-lg rounded-lg sm:mt-10 mt-5 sm:w-[400px] w-[200px] sm:h-[60px] h-[40px] sm:text-bold sm:text-2xl amasis '>Click Here</button>
      </div>
      </div>
      
  <div className='lg:my-0 my-20'>
   <img src={IWaste} alt=""/>

   <div className="bg-black text-white ">
   <h2 className='sm:text-3xl text-md py-5 text-center amasis'>Together, we Can rid Lagos off Street Waste.</h2>
   </div>
  </div>

     </section>
    </main>
  </div>
 );
}

export default Landing;
