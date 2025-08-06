
import React from "react";
import Navbar from "../Navbar";
import Faq from "./components/Faq";
import Footer from "../Footer";

export default function Service() {
  return (
    <div className="w-full min-h-screen">
      {/* Navbar */}
     <Navbar></Navbar>

      {/* Hero Section */}
      <div
        className="w-full h-[85vh] bg-cover mt-15 bg-center flex flex-col justify-center items-start px-10 md:px-28"
        style={{ opacity:1,
          backgroundImage: `url('src/assets/images/29a183e94cfaa1c70f9923b9dff53e831733a031.jpg')`,
        }}
      >
        <h1 className="text-white mt-50  text-4xl md:text-5xl font-bold mb-4">
          Meet the Best <br /> Hospital
        </h1>
        <p className="text-white text-lg mb-6 max-w-xl">
          We know how large objects will act, but things on a small scale.
        </p>
        <div className="flex space-x-4">
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full font-semibold">
            Get Quote Now
          </button>
          <button className="border border-white text-white px-5 py-2 rounded-full font-semibold hover:bg-white hover:text-teal-700">
            Learn More
          </button>
        </div>
      </div>
      <Faq></Faq>
      <Footer></Footer>
    </div>
  );
}

