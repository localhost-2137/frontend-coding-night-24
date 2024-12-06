import { useEffect, useState } from "react";

interface message {
  id: number;
  content: string;
  sender: "user" | "bot";
  type?: "message" | "alert";
}

export default function Chat(): JSX.Element {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<message[]>([
    {
      id: 2,
      content: "Cześć! Jak mogę pomóc?",
      sender: "bot",
    },
  ]);

  function sendMessage() {
    if (message.trim() === "") return;
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        content: message,
        sender: "user",
      },
    ]);
    setMessage("");
  }

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <header className="w-full h-fit py-2 px-4 font-poppins text-lg flex items-center gap-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2076/2076218.png"
          className="h-8 invert"
          alt=""
        />
        Chat
      </header>
      <div className="w-full h-full flex flex-col gap-2 overflow-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`w-full h-fit px-4 py-2 flex items-center gap-2 font-poppins text-lg ${
              message.sender === "user" ? "text-white" : "text-gray-400"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full ${
                message.sender === "user"
                  ? "bg-white"
                  : message.type === "alert"
                  ? "bg-red-500"
                  : "bg-gray-400"
              }`}
            />
            {message.type === "alert" ? (
              <div className="!text-red-500">{"> " + message.content}</div>
            ) : (
              "> " + message.content
            )}
          </div>
        ))}
      </div>
      <div className="w-full h-fit py-2 px-4 font-poppins text-lg border-t-2 border-gray-800 flex items-center justify-between gap-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
          className="h-6 invert cursor-pointer"
          alt="add_image"
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
