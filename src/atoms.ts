import { atom } from "jotai";
import { BaseData, chatMessage } from "./interfaces";

const baseDataAtom = atom<BaseData>({
  currentO2: 100,
  currentPeopleInBase: 12,
  currentDoorStatus: "Zamknięte",
});

const chatMessagesAtom = atom<chatMessage[]>([
  {
    id: 1,
    content: "Początek chatu",
    sender: "bot",
    type: "sys_info",
  },
  {
    id: 2,
    content: "jAKIEŚ COŚ BŁĄD",
    sender: "bot",
    type: "alert",
  },
  {
    id: 3,
    content: "jAKIEŚ COŚ info",
    sender: "bot",
    type: "info",
  },
  {
    id: 4,
    content: "jAKIEŚ COŚ wiadomość",
    sender: "user",
    type: "message",
  },
  {
    id: 5,
    content: "jAKIEŚ COŚ odpowiedź",
    sender: "bot",
    type: "message",
  },
]);

export { baseDataAtom, chatMessagesAtom };