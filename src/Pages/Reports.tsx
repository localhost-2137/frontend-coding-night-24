import Background from "@/Assets/background.png";
import Mars from "@/Assets/mars.jpg";
import useReports from "@/hooks/useReports.ts";
import ReportCard from "@/components/reportCard.tsx";

export interface IReport {
    id: number,
    label: string,
    content: string,
    created_at: string
}

export default function Reports() {

    const {data, status} = useReports()

    if (status === "error") {
        return <div>Nie udało się pobrać raportów</div>
    }

    return (
        <div className="w-screen h-screen flex lg:items-center overflow-y-auto overflow-x-hidden lg:justify-center"
             style={{background: `url(${Background})`}}>
            <img
                src={Mars}
                alt="Mars"
                className="right-0 fixed w-1/2 top-0 ml-32"
            />
            <div
                className="2xl:w-2/3 xl:w-4/5 w-full mx-4 lg:h-4/5 z-30 gap-4 py-3">
                <h2 className="text-3xl text-white py-2">Ostatnie Raporty</h2>
                <hr/>
                <div className="py-2 flex flex-col gap-4">
                    {status === "pending" && <div>Ładowanie...</div>}
                    {status === "error" && <div>Nie znaleziono raportów</div>}
                    {status === "success" && data!.data.map((report: IReport) => {
                        return <ReportCard report={report} key={report.id}/>
                    })}
                </div>
            </div>
        </div>
    )
}