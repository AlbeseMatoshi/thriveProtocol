import {Search} from "../components/Search.tsx";
import {useEffect, useState} from "react";
import {useDebounceValue} from "usehooks-ts";
import {PostData} from "../utils/api/interfaces/PostData.ts";
import {Table} from "../components/Table.tsx";
import MultiSelectDropdwon from "../components/MultiSelectDropdown.tsx";
import PostAPI from "../utils/api/PostAPI.ts";

export default function PostsPage() {
  const [title, setTitle] = useState("");
  const [debouncedTitle] = useDebounceValue<string>(title, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [localData, setLocalData] = useState<PostData[] | null>(null);
  const [selectedColumns, setSelectedColumns] = useState<Set<string>>(new Set([
    "id",
    "title",
    "body",
  ])); // Default selected columns


  const [{ data: fetchedData }] = PostAPI.getAll(currentPage, debouncedTitle);

  // Use either fetched data or local filtered data(if less than 10 data are returned we dont make api calls for searching, we handle search on frontend side)
  const dataToDisplay = localData || fetchedData;

  useEffect(() => {
    if (fetchedData?.length <= 10) {
      setLocalData(fetchedData);
    } else {
      setLocalData(null);
    }
  }, [fetchedData]);

  useEffect(() => {
    if (localData) {
      const filtered = localData.filter((post) =>
          post.title.toLowerCase().includes(debouncedTitle.toLowerCase())
      );
      setLocalData(filtered);
    }
  }, [debouncedTitle]);

  const allColumns = [
    { Header: "ID", accessor: "id" },
    { Header: "Title", accessor: "title" },
    { Header: "Body", accessor: "body" },
  ];
  const filteredColumns = allColumns.filter((col) =>
      selectedColumns.has(col.accessor as string)
  );

  const dropdownOptions = allColumns.map((col) => ({
    label: col.Header,
    value: col.accessor as string,
  }));

  return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">Posts</h1>
            <p className="mt-2 text-sm text-gray-700">
              This list of posts is retrieved from open API:   https://jsonplaceholder.typicode.com/posts
            </p>
          </div>
          <Search setValue={setTitle} placeholder={'Search post...'} setCurrentPage={setCurrentPage}/>

          <MultiSelectDropdwon formFieldName={'columns'} options={dropdownOptions}
                               onChange={(item:any) => {
                                 if(selectedColumns.has(item)) {
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
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <Table data={dataToDisplay} columns={filteredColumns} defaultSort={'asc'}/>
            </div>
          </div>
        </div>
      </div>
  )
}
