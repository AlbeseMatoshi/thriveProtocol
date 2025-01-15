import {Search} from "../components/Search.tsx";
import {useEffect, useState} from "react";
import {useDebounceValue} from "usehooks-ts";
import {PostData} from "../utils/api/interfaces/PostData.ts";
import {Column, Table} from "../components/Table.tsx";
import MultiSelectDropdwon from "../components/MultiSelectDropdown.tsx";
import PostAPI from "../utils/api/PostAPI.ts";
import {Paginator} from "../components/Paginator.tsx";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "../components/ui/sheet.tsx";


export default function PostsPage() {
  const [title, setTitle] = useState("");
  const [debouncedTitle] = useDebounceValue<string>(title, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [localData, setLocalData] = useState<PostData[] | null>(null);
  const [selectedColumns, setSelectedColumns] = useState<Set<string>>(new Set([
    "id",
    "title",
    "body",
  ]));
  const [displayPerPage] = useState(10); // Number of items per page


  const [{ data: fetchedData ,response}] = PostAPI.getAll(currentPage, displayPerPage, debouncedTitle);

  console.log(response,'resi')
  // Use either fetched data or local filtered data(if less than 10 data are returned we dont make api calls for searching, we handle search on frontend side)
  const dataToDisplay = localData || fetchedData;

  //when the component is first rendered, it checks if fetchedData is less than 10(if true localData is used to handle searching in frontend side)
  useEffect(() => {
    if (fetchedData && fetchedData?.length <= 10) {
      setLocalData(fetchedData);
    } else {
      setLocalData(null);
    }
  }, [fetchedData]);

  //whenever user starts typing in search box, it filters the data if its local data
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
  ) as Column<PostData>[]

  const dropdownOptions = allColumns.map((col) => ({
    label: col.Header,
    value: col.accessor as string,
  }));
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [viewPost, setViewPost] = useState<PostData>({} as PostData);

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
        <Sheet open={openModal} onOpenChange={(open) => setOpenModal(open)}>
          <SheetContent>
            <SheetHeader className={'mb-10'}>
              <SheetTitle className={'text-base/7 font-semibold text-gray-900'}>Post Details</SheetTitle>
              <SheetDescription className="mt-1 max-w-2xl text-sm/6 text-gray-500">
                View or edit the details of the post with id {viewPost.id}
              </SheetDescription>
            </SheetHeader>
            <div>
              <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">Id</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-3 sm:mt-0">{viewPost.id}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">Title</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-3 sm:mt-0">{viewPost.title}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                    <dt className="text-sm/6 font-medium text-gray-900">Body</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-3 sm:mt-0">{viewPost.body}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            {!!dataToDisplay && (
                <>
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <Table data={dataToDisplay} columns={filteredColumns} defaultSort={{column:'id',direction :'asc'}} actions={[
                      {
                        placeholder: 'View',
                        onClick: (post: PostData) => {
                          setViewPost(post);
                          setOpenModal(true);
                        },
                        classNames:'text-gray-900'
                      },
                      {
                        placeholder: 'Delete',
                        onClick: (post: PostData) => {
                          window.confirm("Are you sure that you want to delete the post with title " + post.title);
                        },
                        classNames:'text-red-500'
                      }
                    ]}/>
                  </div>
                  <Paginator
                      totalPages={(response?.headers?.['x-total-count'] / displayPerPage) || 1} initialPage={currentPage}
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
