import DataTable, {TableStyles} from 'react-data-table-component';

interface IItem {
    id: number;
    name: string;
    description?: string;
    quantity: number;
    unit?: string;
    critical_level: number;
    last_checked: string;
    location?: string;
}

export default function ItemsTable({data}: { data: IItem[] }) {

    const customStyles: TableStyles = {
        header: {
            style: {
                backgroundColor: '#1F2937', // Tailwind gray-900
                color: '#fff',
            },
        },
        headRow: {
            style: {
                backgroundColor: '#1F2937', // Tailwind gray-900
                color: '#fff',
            },
        },
        headCells: {
            style: {
                color: '#fff',
            },
        },
        rows: {
            style: {
                backgroundColor: '#374151', // Tailwind gray-800
                color: '#fff',
                '&:hover': {
                    backgroundColor: '#4B5563', // Slightly lighter gray
                },
            },
        },
        pagination: {
            style: {
                backgroundColor: '#1F2937', // Tailwind gray-900
                color: '#fff',
            },
        },
    };

    const columns = [
        {
            name: "Id",
            selector: (row: IItem) => row.id,
            sortable: true,
        },
        {
            name: "Nazwa",
            selector: (row: IItem) => row.name,
            sortable: true,
        },
        {
            name: "Opis",
            selector: (row: IItem) => row.description || '',
            sortable: true,
        },
        {
            name: "Ilość",
            selector: (row: IItem) => row.quantity,
            sortable: true,
        },
        {
            name: "Jednostka Miary",
            selector: (row: IItem) => row.unit || '',
            sortable: true,
        },
        {
            name: "Poziom Krytyczny",
            selector: (row: IItem) => row.critical_level,
            sortable: true,
        },
        {
            name: "Ostatnio Użyte",
            selector: (row: IItem) => row.last_checked,
            sortable: true,
        },
        {
            name: "Lokalizacja",
            selector: (row: IItem) => row.location || '',
            sortable: true,
        },
    ];

    return (
        <DataTable columns={columns} data={data} customStyles={customStyles}/>
    )
}