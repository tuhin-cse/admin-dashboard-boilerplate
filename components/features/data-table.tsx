"use client"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import React from "react";
import {Button} from "@/components/ui/button";
import {useAction} from "@/helpers/hooks";
import {cn} from "@/lib/utils";


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
                       columns,
                       data,
                       indexed,
                       onView,
                       onEdit,
                       onDelete,
                       onReload
                   }: {
    columns: Column[],
    data: Pagination | Data[],
    indexed?: boolean,
    onView?: (row: Data) => void,
    onEdit?: (row: Data) => void,
    onDelete?: (row: Data) => void,
    onReload?: () => void
}) => {

    const hasAction = !!onView || !!onEdit || !!onDelete;

    const [loading, setLoading] = React.useState(false);
    const [show, setShow] = React.useState(false);

    const hasPagination = typeof data !== "undefined" && "totalDocs" in data;
    const docs: Data[] = hasPagination ? data.docs : data;

    return (
        <>
            <Table className={cn("border-y data-table", hasPagination && "pagination")}>
                <TableHeader>
                    <TableRow>
                        {indexed && <TableHead className="w-[50px] md:w-[100px]">#</TableHead>}
                        {columns.map((column, index) => (
                            <TableHead key={index} className={column.headerClassName}>
                                {column.name}
                            </TableHead>
                        ))}
                        {hasAction && <TableHead className="text-end">Action</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {docs?.map((row, index: number) => (
                        <TableRow key={index}>
                            {indexed && <TableCell className="w-[50px] md:w-[100px]">{index + 1}</TableCell>}
                            {columns.map((column, index) => (
                                <TableCell key={index} className={column.cellClassName}>
                                    {column.formatter ? column.formatter(row[column.key], row) : row[column.key]}
                                </TableCell>
                            ))}
                            {hasAction && (
                                <TableCell>
                                    <div className="flex justify-end items-center gap-2">
                                        {onView && (
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => onView(row)}
                                                className="text-primary-600 hover:text-primary-700"
                                            >
                                                View
                                            </Button>
                                        )}



                                        {onEdit && (
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => onEdit(row)}
                                                className="text-primary-600 hover:text-primary-700"
                                            >
                                                Edit
                                            </Button>
                                        )}
                                        {onDelete && (
                                            <Dialog open={show} onOpenChange={setShow}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                    >
                                                        Delete
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                        <DialogDescription>
                                                            This action cannot be undone. This will permanently delete
                                                            this
                                                            record.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <Button
                                                            disabled={loading}
                                                            onClick={() => setShow(false)}
                                                            variant="secondary">Cancel</Button>
                                                        <Button
                                                            disabled={loading}
                                                            onClick={() => {
                                                                setLoading(true)
                                                                // eslint-disable-next-line react-hooks/rules-of-hooks
                                                                return useAction(onDelete, {oid: row._id}, () => {
                                                                    if (onReload) {
                                                                        onReload()
                                                                    }
                                                                    setShow(false)
                                                                    setLoading(false)
                                                                }, () => {
                                                                    setLoading(false)
                                                                })
                                                            }}
                                                            variant="destructive">Confirm</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        )}
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )

}


export default DataTable;