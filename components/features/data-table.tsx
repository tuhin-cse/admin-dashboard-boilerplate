import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import React from "react";


export interface Data {
    [key: string]: any;
}

export interface Column {
    name: string;
    key: string;
    headerClassName?: string;
    cellClassName?: string;
    formatter?: (value: any, row?: any) => React.ReactNode;
}

interface Pagination {
    docs: Data[];
    totalDocs: number;
    limit: number;
    totalPages: number;
}


const DataTable = ({
                       title,
                       description,
                       columns,
                       data,
                   }: {
    title: string;
    description?: string;
    columns: Column[],
    data: Pagination | Data[],
}) => {

    const docs: Data[] = "docs" in data ? data.docs : data;
    return (
        <Card>
            <CardHeader className="px-7 pb-4 mb-2 border-b">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableHead key={index} className={column.headerClassName}>
                                    {column.name}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {docs.map((row, index: number) => (
                            <TableRow key={index}>
                                {columns.map((column, index) => (
                                    <TableCell key={index} className={column.cellClassName}>
                                        {column.formatter ? column.formatter(row[column.key], row) : row[column.key]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )

}


export default DataTable;