import Wrapper from "@/Layout/Wrapper";
import Background from "../Assets/background.png";
import AlertSound from "../Assets/alert.mp3";
import Chat from "@/Layout/Chat";
import Mars from "../Assets/mars.jpg";
import MapWrapper from "@/components/map/marsMap.tsx";
import BaseData from "@/Layout/BaseData";
import {useAtom, useSetAtom} from "jotai";
import {baseDataAtom, chatMessagesAtom} from "@/atoms";
import {useEffect} from "react";
import {alertAtom} from "@/atoms/alertAtom.ts";
import {useRef} from "react";
import MarsStats from "@/Layout/MarsStats";

export default function Dashboard(): JSX.Element {
    const setBaseData = useSetAtom(baseDataAtom);
    const setMessages = useSetAtom(chatMessagesAtom);
    const [alert, setAlert] = useAtom(alertAtom)
    const audioRef = useRef<HTMLAudioElement>(null);
    const WS_URL = `ws://${window.location.host}/api/ws`;

    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket(WS_URL);

        ws.current.onopen = () => {
            console.log("Connected");
        };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === "base_data") {
                setBaseData({
                    currentPeopleInBase: data.value.inside,
                    currentO2: data.value.o2,
                    currentDoorStatus: data.value.open ? "Otwarte" : "Zamknięte",
                });
            }

            if (data.type === "alert") {
                setAlert(true)
                setMessages((prev) => [
                    ...prev,
                    {
                        id: Math.random(),
                        content: data.value,
                        sender: "bot",
                        type: "alert",
                    },
                ]);
                setTimeout(() => {
                    setAlert(false);
                }, 10000);
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
            if (data.type === "info") {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: Math.random(),
                        content: data.value,
                        sender: "bot",
                        type: "info",
                    },
                ]);
            }
        };

        return () => {
            ws.current?.close();
        };
    }, []);

    useEffect(() => {
        if (alert && audioRef.current) {
            audioRef.current.play();
        }
    }, [alert]);

    function sendMessage(message: string) {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({type: "ai", value: message}));
        } else {
            console.error(
                "WebSocket is not open. Ready state:",
                ws.current?.readyState
            );
        }
    }

    return (
        <div
            className="w-screen h-screen flex lg:items-center overflow-y-auto overflow-x-hidden lg:justify-center"
            style={{background: `url(${Background})`}}
        >
            <audio ref={audioRef} src={AlertSound}/>
            <img
                src={Mars}
                alt="Mars"
                className="right-0 fixed w-1/2 top-0 ml-32"
            />
            <div
                className="2xl:w-2/3 xl:w-4/5 w-full mx-4 lg:h-4/5 lg:grid hidden grid-cols-6 lg:grid-rows-10 grid-rows-12 z-30 gap-4 py-3">
                <Wrapper
                    className="col-span-4 lg:row-span-6 overflow-hidden"
                    animation={true}
                    delay={0.2}
                >
                    <MapWrapper/>
                </Wrapper>
                <Wrapper
                    className="col-span-2 lg:row-span-10 row-span-8"
                    animation={true}
                    delay={0.3}
                >
                    <Chat sendMessageToChat={sendMessage}/>
                </Wrapper>
                <Wrapper
                    className="col-span-2 row-span-4"
                    animation={true}
                    delay={0.4}
                >
                    <BaseData/>
                </Wrapper>
                <Wrapper
                    className="col-span-2 row-span-4"
                    animation={true}
                    delay={0.4}
                >
                    <MarsStats/>
                </Wrapper>
            </div>
            <div className="lg:hidden flex flex-col gap-6 w-full h-[150vh] mt-32 mb-8 px-4 overflow-y-auto">
                <Wrapper className="w-full !h-[600px] overflow-hidden" animation={true} delay={0.2}>
                    <MapWrapper/>
                </Wrapper>
                <Wrapper className="w-full" animation={true} delay={0.3}>
                    <Chat sendMessageToChat={sendMessage}/>
                </Wrapper>
                <Wrapper className="w-full !h-64" animation={true} delay={0.4}>
                    <BaseData/>
                </Wrapper>
                <Wrapper className="w-full !h-48" animation={true} delay={0.4}>
                    <MarsStats/>
                </Wrapper>
            </div>
        </div>
    );
}
