import { useEffect, useState } from "react";
import mars_gif from "../Assets/mars.gif";
import { useAtomValue } from "jotai";
import { baseDataAtom } from "@/atoms";

export default function BaseData(): JSX.Element {
  const baseData = useAtomValue(baseDataAtom);
  const [currentTime, setCurrentTime] = useState<string>("00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-4 p-6 relative">
      <p className="text-center font-poppins font-bold text-xl">Dane Bazy</p>
      <div className="flex items-center justify-between">
        <p className="font-poppins text-2xl font-bold flex items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2088/2088617.png"
            className="invert h-6"
            alt=""
          />
          <span className="text-gray-400">{currentTime}</span>
        </p>
        <p className="font-poppins text-2xl font-bold flex items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
            className="invert h-6"
            alt=""
          />
          <span className="text-gray-400">{baseData.currentPeopleInBase}</span>
        </p>
      </div>
      <p className="font-poppins text-2xl font-bold flex items-center gap-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/5674/5674881.png"
          className="invert h-6"
          alt=""
        />
        <span className="text-gray-400">{baseData.currentO2}%</span>
      </p>
      <p className="font-poppins text-2xl font-bold flex items-center gap-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/59/59805.png"
          className="invert h-6"
          alt=""
        />
        <span className="text-gray-400">{baseData.currentDoorStatus}</span>
      </p>
      <img
        src={mars_gif}
        alt="mars_gif"
        className="w-16 absolute right-12 bottom-12 -z-10 img-hor-vert"
      />
    </div>
  );
}
