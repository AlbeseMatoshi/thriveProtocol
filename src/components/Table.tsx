import {useEffect, useState} from "react";
import {sortData} from "../utils/util.ts";
import {ArrowDownIcon, ArrowUpIcon} from "@heroicons/react/24/outline";

interface Column<T> {
    Header: string;
    accessor: keyof T;
}
interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    defaultSort?: { column: keyof T; direction: "asc" | "desc" };
}

export const Table = <T,>({ data, columns, defaultSort }: TableProps<T>) => {
    const [sortBy, setSortBy] = useState<keyof T | null>(defaultSort?.column || null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">(defaultSort?.direction || "asc");
    const [sortedData, setSortedData] = useState(data);

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
        <table className="min-w-full divide-y divide-gray-300">
            <thead>
            <tr>
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
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {sortedData?.length > 0 ? (
                sortedData?.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((col) => (
                            <td className={'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'} key={col.accessor as string}>{row[col.accessor] as any}</td>
                        ))}
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
    );
};
