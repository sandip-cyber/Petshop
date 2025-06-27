import React from 'react'
import { images } from '../assets/images';

const NewsLetter = () => {
    return (
        <div className="flex flex-col items-center w-full max-w-6xl lg:w-full rounded-b-md px-4 py-12 md:py-16 mx-2 lg:mx-auto my-5 bg-gray-900 text-white">
            <div className="flex flex-col justify-center items-center text-center">
                <h1 className="text-4xl md:text-[40px]">Stay Inspired</h1>
                <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-xl">Join our newsletter and be the first to discover new updates, exclusive offers, and inspiration.</p>
            </div>
            <form className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
                <input type="text" className="bg-white/10 px-4 py-2.5 border border-white/20 rounded outline-none max-w-66 w-full" placeholder="Enter your email" />
                <button className="flex items-center justify-center gap-2 group bg-primary px-4 md:px-7 py-2.5 rounded active:scale-95 transition-all">Subscribe
                    <img src={images.arrow} alt="" />
                </button>
            </form>
            <p className="text-gray-500 mt-6 text-xs text-center">By subscribing, you agree to our Privacy Policy and consent to receive updates.</p>
        </div>

    );
};


export default NewsLetter
