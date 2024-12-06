import {useQuery} from "@tanstack/react-query";
import getMarsMarkers from "@/lib/nasa/getMarsMarkers.ts";

export default function useMarsMarkers() {

    const {data, status} = useQuery({
        queryKey: ["marsMarkers"],
        queryFn: getMarsMarkers
    })

    return {data, status}
}