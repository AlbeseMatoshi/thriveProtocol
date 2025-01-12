import UserAPI from "../utils/api/UserAPI.ts";
import {Search} from "../components/Search.tsx";
import {useEffect, useState} from "react";
import {useDebounceValue} from "usehooks-ts";
import {UserData} from "../utils/api/interfaces/UserData.ts";
import {Button} from "../components/Button/Button.tsx";
import {Table} from "../components/Table.tsx";

export default function UsersPage() {
  const [userName, setUserName] = useState("");
  const [debouncedUserName] = useDebounceValue<string>(userName, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [localData, setLocalData] = useState<UserData[] | null>(null);

  const [{ data: fetchedData }] = UserAPI.getAll(currentPage, localData ? undefined : debouncedUserName);

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

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Name", accessor: "name" },
    { Header: "Age", accessor: "username" },
    { Header: "Email", accessor: "email" },
    { Header: "Website", accessor: "website" },
  ];
  return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">
              This list of users is retrieved from open API:   https://jsonplaceholder.typicode.com/users
            </p>
          </div>
          <Search setValue={setUserName} placeholder={'Search user...'} setCurrentPage={setCurrentPage}/>

          <div className="mt-4 sm:ml-6 sm:mt-0 sm:flex-none">
            <Button variant={'primary'} size={"medium"} className={''}
            >
              Add user
            </Button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <Table data={dataToDisplay} columns={columns} defaultSort={'asc'}/>
            </div>
          </div>
        </div>
      </div>
  )
}
