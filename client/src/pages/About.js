import React from "react";

const About = () =>
{
  return (
    <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="w-full lg:w-8/12 ">
          <img className="w-full h-full" src="https://i.ibb.co/FhgPJt8/Rectangle-18.png" alt="A group of People" />
        </div>
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">About Us</h1>
          <p className="font-medium text-base leading-6 text-gray-600 ">Our platform is designed to be user-friendly and easy to navigate. We use a combination of React and other technologies such as React Router for client-side routing and Redux for state management to ensure that our platform is fast and responsive.</p>
        </div>

      </div>

      <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">Our Story</h1>
          <p className="font-normal text-base leading-6 text-gray-600 ">We are confident that you will find our platform to be a valuable resource for learning new skills and expanding your knowledge. Thank you for choosing our React-based course platform!"
            <br></br>
            <br></br>
            You can change the text according to your needs and make it more personalized, but this should give you an idea of what you can include in the "About" page for your React-based course platform.</p>
        </div>
        <div className="w-full lg:w-8/12 lg:pt-8">
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <img className="md:block hidden" src="https://i.ibb.co/FYTKDG6/Rectangle-118-2.png" alt="Alexa featured Img" />
              <img className="md:hidden block" src="https://i.ibb.co/zHjXqg4/Rectangle-118.png" alt="Alexa featured Img" />
              <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Alexa</p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <img className="md:block hidden" src="https://i.ibb.co/fGmxhVy/Rectangle-119.png" alt="Olivia featured Img" />
              <img className="md:hidden block" src="https://i.ibb.co/NrWKJ1M/Rectangle-119.png" alt="Olivia featured Img" />
              <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Olivia</p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <img className="md:block hidden" src="https://i.ibb.co/Pc6XVVC/Rectangle-120.png" alt="Liam featued Img" />
              <img className="md:hidden block" src="https://i.ibb.co/C5MMBcs/Rectangle-120.png" alt="Liam featued Img" />
              <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Urmil</p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <img className="md:block hidden" src="https://i.ibb.co/7nSJPXQ/Rectangle-121.png" alt="Elijah featured img" />
              <img className="md:hidden block" src="https://i.ibb.co/ThZBWxH/Rectangle-121.png" alt="Elijah featured img" />
              <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Pritam</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
