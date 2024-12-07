import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {IReport} from "@/Pages/Reports.tsx";

export default function ReportCard({report}: { report: IReport }) {
    const date = new Date(report.created_at);
    const formattedDate = date.toLocaleString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    return (
        <Card className="bg-gray-800">
            <CardHeader>
                <CardTitle>
                    {report.label}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {report.content}
            </CardContent>
            <CardFooter>
                <p>Utworzono: {formattedDate}</p>
            </CardFooter>
        </Card>
    )
}