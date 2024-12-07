import Mars from "../Assets/mars.jpg";
import Background from "../Assets/background.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function MainPage(): JSX.Element {
  const acronymLetters = ["S.", "R.", "A.", "M."];
  const wordList = ["Space", "Research", "Around", "Mars"];

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const backgroundImage = screenWidth >= 768 ? Background : Mars;

  return (
    <div
      className={`w-screen h-screen overflow-hidden flex items-center lg:px-32 px-16 gap-8 bg-cover bg-center`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute w-screen h-screen left-0 top-0 bg-black/60"></div>
      <div className="flex flex-col justify-center xl:text-8xl lg:text-6xl text-5xl font-poppins font-bold gap-16 text-white">
        {acronymLetters.map((letter, index) => (
          <p
            key={index}
            className={`animate-slideIn opacity-0`}
            style={{
              animationDelay: `${index * 0.2 + 1}s`,
              animationFillMode: "forwards",
            }}
          >
            {letter}
          </p>
        ))}
      </div>
      <div className="flex flex-col justify-center xl:text-8xl lg:text-6xl text-5xl font-poppins font-bold gap-16 text-gray-400 p-4 drop-shadow-lg relative">
        {wordList.map((word, index) => (
          <p
            key={index}
            className={`animate-appear opacity-0`}
            style={{
              animationDelay: `${(index + acronymLetters.length) * 0.3 + 1.5}s`,
              animationFillMode: "forwards",
            }}
          >
            {word}
          </p>
        ))}
        <Button
          className="absolute -bottom-20 -left-24 xl:text-xl text-sm p-4 rounded-xl opacity-0 bg-gray-700 border-transparent duration-500 animate-appear"
          variant={"outline"}
          style={{
            animationDelay: `4s`,
          }}
          asChild
        >
          <Link to="/dashboard">Przejdź do aplikacji</Link>
        </Button>
      </div>
      <img
        src={Mars}
        alt="Mars"
        className="right-0 top-0 xl:ml-32 ml-16 md:block hidden animate-slideInFromRight"
      />
    </div>
  );
}
