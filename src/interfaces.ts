interface BaseData {
    currentO2: number;
    currentPeopleInBase: number;
    currentDoorStatus: "Otwarte" | "Zamknięte";
}

interface chatMessage {
    id: number;
    content: string;
    sender: "user" | "bot";
    type: "message" | "alert" | "info" | "sys_info";
}

export type { BaseData, chatMessage };