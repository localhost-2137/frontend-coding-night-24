import getReports from "@/lib/api/getReports";
import {useQuery} from "@tanstack/react-query";

export default function useReports() {
    const {data, status} = useQuery({
        queryKey: ["reports"],
        queryFn: getReports,
    })

    return {data, status}
}