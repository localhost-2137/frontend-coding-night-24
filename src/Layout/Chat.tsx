import { chatMessagesAtom } from "@/atoms";
import { chatMessage } from "@/interfaces";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef } from "react";

export default function Chat({
  sendMessageToChat,
}: {
  sendMessageToChat: (message: string) => void;
}): JSX.Element {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useAtom<chatMessage[]>(chatMessagesAtom);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  function sendMessage() {
    if (message.trim() === "") return;
    sendMessageToChat(message);
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        content: message,
        sender: "user",
        type: "message",
      },
    ]);
    setMessage("");
  }

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <header className="w-full h-fit py-2 px-4 font-poppins text-lg flex items-center justify-between gap-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2076/2076218.png"
          className="h-8 invert"
          alt=""
        />
        Chat
        <Dialog>
          <DialogTrigger>
            <p className="w-8 h-8 rounded-full text-center cursor-pointer border-2">
              ?
            </p>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-white">Legenda</DialogTitle>
              <DialogDescription>
                <span className="text-red-500 text-xl mt-2 block">
                  {">"}Na czerwono oznacza się błędy
                </span>
                <span className="text-yellow-400 text-xl my-2 block">
                  {">"}Na żółto oznacza się informacje
                </span>
                <span className="text-white text-xl my-2 block">
                  {">"}Na biało oznacza się wiadomości
                </span>
                <span className="text-gray-400 text-xl block">
                  {">"}Na szaro oznacza się odpowiedzi bota
                </span>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </header>
      <div
        className="w-full h-full flex flex-col gap-2 overflow-auto"
        ref={chatContainerRef}
      >
        {messages.map((message) =>
          message.type === "sys_info" ? (
            <div
              className="flex items-center justify-between gap-2 px-2"
              key={message.id}
            >
              <div className="w-full h-1 rounded-full bg-gray-400"></div>
              <div className="w-full font-poppins text-md text-gray-400 text-center">
                {message.content}
              </div>
              <div className="w-full h-1 rounded-full bg-gray-400"></div>
            </div>
          ) : (
            <div
              key={message.id}
              className={`w-full h-fit px-4 py-2 flex items-center gap-2 font-poppins break-words text-lg ${
                message.sender === "user" ? "text-white" : "text-gray-400"
              }`}
            >
              {message.type === "alert" ? (
                <div className="!text-red-500">{"> " + message.content}</div>
              ) : message.type === "info" ? (
                <div className="!text-yellow-400">{"> " + message.content}</div>
              ) : (
                "> " + message.content
              )}
            </div>
          )
        )}
      </div>
      <div className="w-full h-fit py-2 px-4 font-poppins text-lg border-t-2 border-gray-800 flex items-center justify-between gap-2">
        <img
          src={
            isRecording
              ? "https://cdn-icons-png.flaticon.com/512/709/709682.png"
              : "https://cdn-icons-png.flaticon.com/512/1082/1082810.png"
          }
          className="h-6 invert cursor-pointer"
          onClick={() => setIsRecording(prev => !prev)}
          alt="microphone_image"
        />
        <ChatInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/10322/10322482.png"
          className="h-6 invert cursor-pointer"
          alt="send"
          onClick={sendMessage}
        />
      </div>
    </div>
  );
}

function ChatInput({
  message,
  setMessage,
  sendMessage,
}: {
  message: string;
  setMessage: (message: string) => void;
  sendMessage: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [sendMessage]);

  return (
    <input
      type="text"
      onChange={(e) => setMessage(e.target.value)}
      value={message}
      placeholder="Wiadomość"
      className="w-full h-full bg-transparent text-white outline-none"
    />
  );
}
