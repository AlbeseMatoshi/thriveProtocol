import UserAPI from "../utils/api/UserAPI.ts";
import {Search} from "../components/Search.tsx";
import {useEffect, useState} from "react";
import {useDebounceValue} from "usehooks-ts";
import {UserData} from "../utils/api/interfaces/UserData.ts";
import {Column, Table} from "../components/Table.tsx";
import MultiSelectDropdwon from "../components/MultiSelectDropdown.tsx";
import {Paginator} from "../components/Paginator.tsx";

export default function UsersPage() {
  const [userName, setUserName] = useState("");
  const [debouncedUserName] = useDebounceValue<string>(userName, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [localData, setLocalData] = useState<UserData[] | null>(null);
  const [selectedColumns, setSelectedColumns] = useState<Set<string>>(new Set([
    "id",
    "name",
    "email",
  ]));
  const [displayPerPage] = useState(5);

  const [{data: fetchedData, response}] = UserAPI.getAll(currentPage, displayPerPage, localData ? undefined : debouncedUserName);

  // Decide whether to search locally or via API
  const dataToDisplay = localData
      ? localData.filter((user) =>
          user.name.toLowerCase().includes(debouncedUserName.toLowerCase())
      )
      : fetchedData;

  useEffect(() => {
    if (fetchedData && fetchedData.length <= 10) {
      setLocalData(fetchedData);
    } else {
      setLocalData(null);
    }
  }, [fetchedData]);

  const allColumns = [
    {Header: "ID", accessor: "id"},
    {Header: "Name", accessor: "name"},
    {Header: "Username", accessor: "username"},
    {Header: "Email", accessor: "email"},
    {Header: "Website", accessor: "website"},
  ];
  const filteredColumns = allColumns.filter((col) =>
      selectedColumns.has(col.accessor as string)
  ) as Column<UserData>[];

  const dropdownOptions = allColumns.map((col) => ({
    label: col.Header,
    value: col.accessor as string,
  }));

  return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">
              This list of users is retrieved from open API: https://jsonplaceholder.typicode.com/users
            </p>
          </div>
          <Search setValue={setUserName} placeholder={'Search user...'} setCurrentPage={setCurrentPage}/>

          <MultiSelectDropdwon formFieldName={'columns'} options={dropdownOptions}
                               onChange={(item: any) => {
                                 if (selectedColumns.has(item)) {
                                   setSelectedColumns(() => new Set([...selectedColumns].filter(el => el != item)))
                                 } else {
                                   setSelectedColumns(() => new Set([...selectedColumns, item]))
                                 }
                               }}
                               items={selectedColumns}
          />
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            {!!dataToDisplay && (
                <>
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <Table data={dataToDisplay} columns={filteredColumns}
                           defaultSort={{column: 'id', direction: 'asc'}}/>
                  </div>
                  <Paginator
                             totalPages={(response?.headers?.['x-total-count'] / displayPerPage) || 1}
                             initialPage={currentPage}
                             onPageSelect={(e) => {
                               setCurrentPage(e);
                             }}/>
                </>
            )}
          </div>
        </div>
      </div>
  )
}
