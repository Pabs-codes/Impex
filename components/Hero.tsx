// // *********************
// // Role of the component: Classical hero component on home page
// // Name of the component: Hero.tsx
// // Developer: Aleksandar Kuzmanovic
// // Version: 1.0
// // Component call: <Hero />
// // Input parameters: no input parameters
// // Output: Classical hero component with two columns on desktop and one column on smaller devices
// // *********************

import React from "react";
import Image from "next/image";

const Hero = () => {
    return (
        // <div
        //     className="relative h-[700px] w-full bg-gradient-animated max-lg:h-[900px] max-md:h-[750px]"
        //     style={{
        //         backgroundImage: `url('/BGN.jpg')`,
        //         backgroundSize: "cover",
        //         backgroundPosition: "center",
        //     }}
        // >

        <div
            className="relative h-[700px] w-full max-lg:h-[900px] max-md:h-[750px] overflow-hidden max-lg:top-7"
        >
            <video
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="/bgvid.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            <div
                className="grid grid-cols-3 items-center justify-items-center px-10 gap-x-10 max-w-screen-2xl mx-auto h-full max-md:grid-cols-1 max-md:py-10 max-md:gap-y-10 ">
                <div
                    className="flex flex-col gap-y-5 col-span-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg backdrop-saturate-150 rounded-lg p-16">
                    <h1 className="text-6xl text-white font-bold mb-3 max-xl:text-5xl max-md:text-4xl max-sm:text-3xl drop-shadow-lg">
                        Welcome to <br/> Supper Supply Impex
                    </h1>
                    <p className="text-white max-sm:text-sm drop-shadow-md">
                        Your one-stop online shop for all your grocery and daily needs. Discover a wide range of fresh
                        produce, dairy products, snacks, and household essentials, all at unbeatable prices. Enjoy a
                        seamless shopping experience with fast delivery and top-notch customer service. Happy shopping!
                    </p>
                    <div className="flex gap-x-4 max-sm:flex-col max-sm:gap-y-2 whitespace-nowrap">
                        <button
                            className="w-full bg-white text-green-600 font-bold px-12 py-3 transition duration-300 transform hover:scale-105 hover:bg-gray-100 shadow-md rounded-lg hover:shadow-lg">
                            SHOP NOW
                        </button>
                        <button
                            className="w-full bg-white text-green-600 font-bold px-12 py-3 transition duration-300 transform hover:scale-105 hover:bg-gray-100 shadow-md rounded-lg hover:shadow-lg">
                            ABOUT US
                        </button>
                    </div>

                </div>

                <Image
                    src="/cart.png"
                    width={400}
                    height={400}
                    alt="smart watch"
                    className="w-auto h-auto transform rotate-3 max-md:hidden"
                />
            </div>
        </div>
    );
};

export default Hero;
