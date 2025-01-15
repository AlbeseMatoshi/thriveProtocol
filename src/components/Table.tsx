import {useEffect, useState} from "react";
import {sortData} from "../utils/util.ts";
import {ArrowDownIcon, ArrowUpIcon} from "@heroicons/react/24/outline";
import { cn } from "../lib/utils.ts";

export interface Column<T> {
    Header: string;
    accessor: keyof T;
}
interface TableProps<T> {
    enableRowSelection?: boolean,
    onRowSelect?: (selectedRows: T[]) => void,
    uniqueKey: keyof T,
    data: T[];
    columns: Column<T>[];
    defaultSort?: { column: keyof T; direction: "asc" | "desc" };
    actions?: {classNames?: string, placeholder: string, onClick: (row: T) => void}[],
}

export const Table = <T,>({ data, columns, uniqueKey, defaultSort, actions, enableRowSelection, onRowSelect }: TableProps<T>) => {
    const [sortBy, setSortBy] = useState<keyof T | null>(defaultSort?.column || null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">(defaultSort?.direction || "asc");
    const [sortedData, setSortedData] = useState(data);
    const [selectedRows, setSelectedRows] = useState<T[]>([]);
    useEffect(() => {
        if (sortBy) {
            setSortedData(sortData(data, sortBy, sortDirection));
        } else {
            setSortedData(data);
        }
    }, [data, sortBy, sortDirection]);

    const handleSort = (column: keyof T) => {
        const newDirection = sortBy === column && sortDirection === "asc" ? "desc" : "asc";
        setSortBy(column);
        setSortDirection(newDirection);
    };

    return (
        <>
            <table className="min-w-full divide-y divide-gray-300">
                <thead>
                <tr>
                    {enableRowSelection && (
                        <th></th>
                    )}
                    {columns.map((col) => (
                        <th className={'py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'}
                            key={col.accessor as string}
                            onClick={() => handleSort(col.accessor)}>
                            <p className={'inline-flex gap-2'}>{col.Header}
                                <span className={'inline'}>
                            {sortBy === col.accessor ? (
                                sortDirection === "asc" ? <ArrowUpIcon className={'size-3 mt-1'}/> :
                                    <ArrowDownIcon className={'size-3 mt-1'}/>
                            ) : (
                                <ArrowDownIcon className={'size-3 mt-1'}/> // Default arrow direction for unsorted columns
                            )}
                        </span></p>
                        </th>
                    ))}
                    {!!actions && (
                        <th className={'text-sm'}>Actions</th>
                    )}
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {sortedData?.length > 0 ? (
                    sortedData?.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {enableRowSelection && (
                                <td>
                                    <input className={'mr-5'} type={'checkbox'} onClick={(e) => {
                                        if ((e.target as HTMLInputElement)?.checked) {
                                            const _rows = [...selectedRows, row];
                                            setSelectedRows(_rows);
                                            if (onRowSelect) {
                                                onRowSelect(_rows);
                                            }
                                        } else {
                                            const _rows = [...selectedRows].filter(el => el[uniqueKey] != row[uniqueKey]);
                                            setSelectedRows(_rows);
                                            if (onRowSelect) {
                                                onRowSelect(_rows);
                                            }
                                    }}} />
                                </td>
                            )}
                            {columns.map((col) => (
                                <td className={'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'} key={col.accessor as string}><p className={'truncate max-w-96'}>
                                    {row[col.accessor] as string}
                                </p></td>
                            ))}
                            {!!actions && (
                                <td className="whitespace-nowrap py-4 pl-4 pr-0 text-sm font-medium text-gray-900 sm:pl-0 text-center">
                                    {actions.map((action,index) => (
                                        <button
                                            key={index}
                                            className={cn("hover:underline mr-2", action.classNames)}
                                            onClick={() => action.onClick(row)

                                        }
                                        >
                                            {action.placeholder}
                                        </button>
                                    ))}
                                </td>
                            )}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td className={'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'} colSpan={columns.length} style={{ textAlign: "center" }}>
                            No data available
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </>
    );
};
