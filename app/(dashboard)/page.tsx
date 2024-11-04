import DataTable, {Column, Data} from "@/components/features/data-table";
import {Badge} from "@/components/ui/badge";

const Page = () => {


    const columns: Column[] = [
        {
            name: "Customer",
            key: "customer",
            cellClassName: "font-medium",
            formatter: (_, data) => {
                return (
                    <div>
                        <div>{data.name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                            {data.email}
                        </div>
                    </div>
                )
            }
        },
        {
            name: "Type",
            key: "type",
            headerClassName: "hidden sm:table-cell",
            cellClassName: "hidden sm:table-cell",
        },
        {
            name: "Status",
            key: "status",
            headerClassName: "hidden sm:table-cell",
            cellClassName: "hidden sm:table-cell",
            formatter: (value) => {
                return (
                    <Badge className="text-xs" variant="secondary">
                        {value}
                    </Badge>
                );
            }

        },
        {
            name: "Date",
            key: "date",
            headerClassName: "hidden md:table-cell",
            cellClassName: "hidden md:table-cell",
        },
        {
            name: "Amount",
            key: "amount",
            headerClassName: "text-right",
            cellClassName: "text-right",
        },
    ]


    const data: Data[] = [
        {
            name: "Liam Johnson",
            email: "liam@example.com",
            type: "Sale",
            status: "Fulfilled",
            date: "2023-06-23",
            amount: "$250.00",
        },
        {
            name: "Olivia Smith",
            email: " olivia@example.com",
            type: "Refund",
            status: "Declined",
            date: "2023-06-24",
            amount: "$150.00",
        },
        {
            name: "Noah Williams",
            email: "noah@example.com",
            type: "Subscription",
            status: "Fulfilled",
            date: "2023-06-25",
            amount: "$350.00",
        },
        {
            name: "Emma Brown",
            email: "emma@example.com",
            type: "Sale",
            status: "Fulfilled",
            date: "2023-06-26",
            amount: "$450.00",
        },
        {
            name: "Liam Johnson",
            email: "liam@example.com",
            type: "Sale",
            status: "Fulfilled",
            date: "2023-06-23",
            amount: "$250.00",
        },
        {
            name: "Olivia Smith",
            email: " olivia@example.com",
            type: "Refund",
            status: "Declined",
            date: "2023-06-24",
            amount: "$150.00",
        },
        {
            name: "Emma Brown",
            email: "emma@example.com",
            type: "Sale",
            status: "Fulfilled",
            date: "2023-06-26",
            amount: "$450.00",
        },
    ]


    return (
        <>
            <DataTable
                title={"Orders"}
                description={"Recent orders from your store."}
                columns={columns}
                data={data}
            />
        </>
    )
}

export default Page;