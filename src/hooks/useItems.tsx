import getItems from "@/lib/api/getItems";
import {useQuery} from "@tanstack/react-query";

export default function useItems() {

    const {data, status} = useQuery({
        queryKey: ["items"],
        queryFn: getItems
    })

    return {data, status}
}