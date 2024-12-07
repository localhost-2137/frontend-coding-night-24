import Wrapper from "@/Layout/Wrapper";
import Background from "../Assets/background.png";
import Chat from "@/Layout/Chat";
import Mars from "../Assets/mars.jpg";
import MapWrapper from "@/components/map/marsMap.tsx";
import BaseData from "@/Layout/BaseData";
import { useSetAtom } from "jotai";
import { baseDataAtom, chatMessagesAtom } from "@/atoms";
import { useEffect } from "react";

export default function Dashboard(): JSX.Element {
  const setBaseData = useSetAtom(baseDataAtom);
  const setMessages = useSetAtom(chatMessagesAtom);
  const WS_URL = "ws://10.42.0.1:3000/ws";

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("Connected");
      ws.send(
        JSON.stringify({
          type: "ai",
          value: "Wyślij coś",
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === "base_data") {
        setBaseData({
          currentPeopleInBase: data.value.inside,
          currentO2: data.value.o2,
          currentDoorStatus: data.value.open ? "Otwarte" : "Zamknięte",
        });
      }

      if (data.type === "alert") {
        setMessages((prev) => [
          ...prev,
          {
            id: Math.random(),
            content: data.value,
            sender: "bot",
            type: "alert",
          },
        ]);
      }
      if (data.type === "text") {
        setMessages((prev) => [
          ...prev,
          {
            id: Math.random(),
            content: data.value,
            sender: "bot",
            type: "message",
          },
        ]);
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div
      className="w-screen h-screen flex items-center overflow-hidden justify-center"
      style={{ background: `url(${Background})` }}
    >
      <img src={Mars} alt="Mars" className="right-0 fixed w-1/2 top-0 ml-32" />
      <div className="w-2/3 h-4/5 grid grid-cols-6 grid-rows-10 z-30 gap-4">
        <Wrapper
          className="col-span-4 row-span-6 overflow-hidden"
          animation={true}
          delay={0.2}
        >
          <MapWrapper />
        </Wrapper>
        <Wrapper
          className="col-span-2 row-span-10"
          animation={true}
          delay={0.3}
        >
          <Chat />
        </Wrapper>
        <Wrapper className="col-span-2 row-span-4" animation={true} delay={0.4}>
          <BaseData />
        </Wrapper>
        <Wrapper className="col-span-2 row-span-4" animation={true} delay={0.4}>
          <h1>Jakieś dane</h1>
        </Wrapper>
      </div>
    </div>
  );
}
