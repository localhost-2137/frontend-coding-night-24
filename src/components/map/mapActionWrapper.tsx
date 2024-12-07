import {Button} from "@/components/ui/button.tsx";
import {useAtom} from "jotai";
import {mapAtom} from "@/atoms/mapAtom.ts";

export default function MapActionWrapper() {

    const [mapConfig, setMapConfig] = useAtom(mapAtom)
    const active = "bg-orange-700 text-white";

    return (
        <div className="absolute top-2 right-1 z-[1000] flex gap-2">
            <Button className={`transition ${mapConfig.action === "view" ? active : ""}`}
                    onClick={() => setMapConfig(prev => {
                        return {
                            ...prev,
                            action: "view"
                        }
                    })}>Przegląd</Button>
            <Button className={`transition ${mapConfig.action === "add" ? active : ""}`}
                    onClick={() => setMapConfig(prev => {
                        return {
                            ...prev,
                            action: "add"
                        }
                    })}>Dodaj</Button>
        </div>
    )
}