import {useMutation} from "@tanstack/react-query";
import addMapPoint from "@/lib/api/addMapPoint.ts";
import {mapAtom} from "@/atoms/mapAtom";
import {useAtom} from "jotai";
import {IMarker} from "@/hooks/useMarsMarkers.ts";

export default function useAddMapPoint() {

    const [, setMapConfig] = useAtom(mapAtom)

    const {mutate, status} = useMutation({
        mutationKey: ["addMapPoint"],
        mutationFn: addMapPoint,
        onSuccess: (_, variables) => {
            setMapConfig(prev => {
                return {
                    ...prev,
                    dialogOpen: false,
                    markers: [...prev.markers, {
                        label: variables.label,
                        position: [variables.latitude, variables.longitude]
                    } as IMarker]
                }
            })
        }
    })

    return {mutate, status}
}