import "./App.css";
import { useState, useEffect } from "react";
import { BsPauseFill } from "react-icons/bs";
import Dice from "../src/assets/images/icon-dice.svg";
import axios from "axios";
import { motion } from "framer-motion";

function App() {
  const [CountAdvice, setCountAdvice] = useState(() => {
    const savedCount = localStorage.getItem("AdviceCount");
    return savedCount ? parseInt(savedCount) : -1;
  });
  const [Advice, setAdvice] = useState(() => {
    const savedAdvice = localStorage.getItem("savedAdvice");
    return savedAdvice || "";
  });
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(false);

  let debounceTimeout: number | undefined;

  async function GenerateAdvice() {
    setLoading(true);
    try {
      const response = await axios.get("https://api.adviceslip.com/advice");
      const nextAdvice = response.data.slip.advice;
      if (Advice !== nextAdvice) {
        setAdvice(() => {
          localStorage.setItem("savedAdvice", nextAdvice);
          return nextAdvice;
        });
        setCountAdvice((prev) => {
          const nextCount = prev + 1;
          localStorage.setItem("AdviceCount", nextCount.toString());
          return nextCount;
        });
        setLoading(false);
      } else if (Advice === nextAdvice) {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          GenerateAdvice();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }

  useEffect(() => {
    if (Advice === "") {
      GenerateAdvice();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {Error ? (
        <div className="w-2/4 h-4/6 flex flex-col gap-5 justify-center items-center bg-blue-600 absolute z-10 rounded-3xl">
          <h1 className="text-4xl text-center text-white">
            Something went wrong!!
          </h1>
          <h2 className="text-base text-center text-white">
            Please Refresh the page
          </h2>
        </div>
      ) : null}
      <motion.div
        layout
        className="App py-7 px-12 rounded-3xl bg-DarkGrayishBlue
      relative"
      >
        {CountAdvice === -1 ? (
          <h4 className="tracking-0.5 uppercase text-xs text-center text-NeonGreen opacity-90">
            Loading...
          </h4>
        ) : (
          <h4 className="tracking-0.5 uppercase text-xs text-center text-NeonGreen opacity-90">
            Advice #{CountAdvice}
          </h4>
        )}
        {!Loading ? (
          <h1 className="text-xl text-center text-LightCyan">"{Advice}"</h1>
        ) : (
          <div className="loader"></div>
        )}
        <div className="mt-2 mb-10 w-full h-1 bg-LightCyan/40 rounded-3xl flex justify-center items-center">
          <BsPauseFill
            size={40}
            className="text-LightCyan bg-DarkGrayishBlue rounded-full p-1"
          />
        </div>
        <button
          onClick={GenerateAdvice}
          className="rounded-full p-4 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 absolute w-fit h-fit bg-NeonGreen hover:shadow-ButtonShadow transition-all"
        >
          <img src={Dice} className="block w-7" />
        </button>
      </motion.div>
    </>
  );
}

export default App;
