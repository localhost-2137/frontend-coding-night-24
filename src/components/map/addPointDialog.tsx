import {Dialog, DialogTitle, DialogContent, DialogHeader, DialogFooter, DialogClose} from "@/components/ui/dialog.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useForm} from "react-hook-form";
import useAddMapPoint from "@/hooks/useAddMapPoint.ts";
import {mapAtom} from "@/atoms/mapAtom";
import {useAtom} from "jotai";
import {Button} from "@/components/ui/button.tsx";
import {useEffect} from "react";

interface Inputs {
    label: string
    latitude: number
    longitude: number
}

export default function AddPointDialog() {

    const [mapConfig, setMapConfig] = useAtom(mapAtom)
    const {register, handleSubmit, setValue} = useForm<Inputs>()
    const {status, mutate} = useAddMapPoint()

    const onSubmit = (data: Inputs) => {
        mutate(data)
    }

    useEffect(() => {
        setValue("latitude", mapConfig.cords.lat)
        setValue("longitude", mapConfig.cords.lng)
    }, [mapConfig.cords]);

    return (
        <Dialog open={mapConfig.dialogOpen} onOpenChange={(open) => {
            setMapConfig(prev => {
                return {...prev, dialogOpen: open}
            })
        }}>
            <DialogContent className="bg-gray-700 text-white">
                <DialogHeader>
                    <DialogTitle>Dodaj nowy punkt</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                    <div>
                        <Label htmlFor="label">Nazwa punktu</Label>
                        <Input id="label" {...register("label", {required: "Oznaczenie jest wymagane"})}/>
                    </div>
                    <div>
                        <Label>latitude</Label>
                        <Input type="number" value={mapConfig.cords.lat}
                               disabled={true} {...register("latitude")}/>
                    </div>
                    <div>
                        <Label>longitude</Label>
                        <Input type="number" value={mapConfig.cords.lng}
                               disabled={true} {...register("longitude")}/>
                    </div>
                    <DialogFooter className="pt-2">
                        <DialogClose asChild>
                            <Button type="button" className="bg-red-700 hover:bg-red-800">Zamknij</Button>
                        </DialogClose>
                        <Button disabled={status === "pending"} type="submit"
                                className="bg-green-700 hover:bg-green-800">
                            {status === "pending" ? "Dodawanie..." : "Dodaj"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}