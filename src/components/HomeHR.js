import React from "react";
import Navbar from "../components/navbarHR";
import circle1 from "../assets/circle-1.svg";
import circle2 from "../assets/circle-2.svg";
import circle3 from "../assets/circle-3.svg";
import bg from "../assets/Bg.svg";
import { Link } from "react-router-dom";

function HomePage() {
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
      {}
      <Navbar />
      <section className="z-10 flex flex-col justify-center items-center pb-14">
        <h1 className="home-title">
          Your Path to <br />
          Career Success <br /> Starts with{" "}
          <span className=" bg-[#FD1D1D]"> TALX</span>
        </h1>
        <p className="text-gray-400 mt-10 max-sm:mt-5 w-1/3 text-center max-sm:w-full max-sm:px-[5%]">
        Welcome to your professional space, where top-notch talent is ready to meet your demands.
        </p>

        <Link to={"/jobs"} className="gradiant cursor-pointer btn home-btn">
          START HERE
        </Link>
      </section>
    </main>
  );
}

export default HomePage;