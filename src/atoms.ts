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
    content: "Hej, z tej strony asystent ai, w czym mogę pomóc?",
    sender: "bot",
    type: "message",
  },
]);

export { baseDataAtom, chatMessagesAtom };