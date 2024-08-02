import React, { useContext, useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import circle1 from "../assets/circle-1.svg";
import circle2 from "../assets/circle-2.svg";
import circle3 from "../assets/circle-3.svg";
import bg from "../assets/Bg.svg";
import { Link } from "react-router-dom";
import { ChatContext } from '../App';


function HomePage() {
  const { toggleChat } = useContext(ChatContext);

  useEffect(() => {
    if (toggleChat) {
      toggleChat(false);
    }
  }, [toggleChat]);
  return (
    <main className="relative min-h-screen">
      <img
        className="absolute z-[-10] bottom-0 right-0 "
        src={circle1}
        alt=""
      />
      <img
        className="absolute z-[-10] bottom-0 left-0 h-3/4"
        src={circle2}
        alt=""
      />
      <img
        className="absolute z-[-10] top-0 right-0 h-1/2"
        src={circle3}
        alt=""
      />
      {/* <img
        className="absolute bottom-0 left-0 max-h-[400px] bg-cover w-[100vw]"
        src={bg}
        alt=""
      /> */}
      <Navbar />
      <section className="z-10 flex flex-col justify-center items-center pb-14">
        <h1 className="home-title">
          Your Path to <br />
          Career Success <br /> Starts with{" "}
          <span className=" bg-[#FD1D1D]"> TALX</span>
        </h1>
        <p className="text-gray-400 mt-10 max-sm:mt-5 w-1/3 text-center max-sm:w-full max-sm:px-[5%]">
          Join a platform that bridges talented professionals with companies
          seeking exceptional skills
        </p>

        <Link to={"/job-list"} className="gradiant cursor-pointer btn home-btn">
          START HERE
        </Link>
      </section>
    </main>
  );
}

export default HomePage;