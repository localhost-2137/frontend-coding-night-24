import Mars from "../Assets/mars.jpg";
import Background from "../Assets/background.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function MainPage(): JSX.Element {
  const acronymLetters = ["S.", "R.", "A.", "M."];
  const wordList = ["Space", "Research", "Around", "Mars"];

  return (
    <div
      className="w-screen h-screen overflow-hidden flex items-center px-32 gap-8"
      style={{ background: `url(${Background})` }}
    >
      <div className="flex flex-col justify-center text-8xl font-poppins font-bold gap-16 text-white">
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
      <div className="flex flex-col justify-center text-8xl font-poppins font-bold gap-16 text-gray-400 relative">
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
          className="absolute -bottom-20 text-xl p-4 opacity-0 bg-gray-700 border-transparent duration-500 animate-appear"
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
        className="right-0 top-0 ml-32 animate-slideInFromRight"
      />
    </div>
  );
}
