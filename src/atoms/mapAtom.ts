import {atom} from "jotai";
import {IMarker} from "@/hooks/useMarsMarkers.ts";

export type IMapAction = "view" | "add"

export interface IMapAtom {
    action: IMapAction,
    cords: { lat: number, lng: number },
    dialogOpen: boolean,
    markers: IMarker[]
}

export const mapAtom = atom<IMapAtom>({
    action: "view",
    cords: {lat: 0, lng: 0},
    dialogOpen: false,
    markers: []
})