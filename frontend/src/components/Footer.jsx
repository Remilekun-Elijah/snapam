import React from 'react';

const Footer = () => {
 return (
   <footer className="text-center py-2 bg-black text-white">
				&copy; Copyright {new Date().getFullYear()}. All rights reserved.
			</footer>
 );
}

export default Footer;