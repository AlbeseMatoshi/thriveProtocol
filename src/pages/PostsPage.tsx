import {useContext, useEffect, useState} from "react";
import {useDebounceValue, useLocalStorage} from "usehooks-ts";
import {PostData} from "../utils/api/interfaces/PostData.ts";
import {Column, Table} from "../components/Table.tsx";
import MultiSelectDropdown from "../components/MultiSelectDropdown.tsx";
import PostAPI from "../utils/api/PostAPI.ts";
import {Paginator} from "../components/Paginator.tsx";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from "../components/ui/sheet.tsx";
import {ConfirmDeleteModal} from "../components/Modals/ConfirmDeleteModal.tsx";
import {CheckCircleIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {toast} from "../components/ui/use-toast.tsx";
import {PostDetails} from "@/components/posts/PostDetails.tsx";
import {SearchContext} from "@/hooks/SearchContext.tsx";
import {Button} from "@/components/ui/button.tsx";


export default function PostsPage() {
    // const [title, setTitle] = useState("");
    const {value: title} = useContext(SearchContext);
    const [debouncedTitle] = useDebounceValue<string>(title, 500);
    const [currentPage, setCurrentPage] = useState(1);
    const [localData, setLocalData] = useState<PostData[] | null>(null);
    const [selectedColumns, setSelectedColumns] = useState<Set<string>>(new Set([
        "id",
        "title",
        "body",
    ]));
    const [displayPerPage] = useState(10); // Number of items per page
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [viewPost, setViewPost] = useState<PostData>({} as PostData);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [postToDelete, setPostToDelete] = useState<PostData>({} as PostData);
    const [selectedPosts, setSelectedPosts] = useState<PostData[]>([]);


    const [{data: fetchedData, response}, refetchPosts] = PostAPI.getAll(currentPage, displayPerPage, debouncedTitle);

    const [{
        data: deleteData,
        loading: deleting,
        error: errorOnDelete, response: deleteResponse
    }, executeDelete] = PostAPI.remove(postToDelete.id as number, {
        manual: true
    })

    // Use either fetched data or local filtered data(if less than 10 data are returned we dont make api calls for searching, we handle search on frontend side)
    const dataToDisplay = localData || fetchedData;

    //when the component is first rendered, it checks if fetchedData is less than 10(if true localData is used to handle searching in frontend side)
    useEffect(() => {
        if (fetchedData && displayPerPage <= (response?.headers['x-total-count'] ?? -1)) {
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
        setCurrentPage(1);
    }, [debouncedTitle]);

    const allColumns = [
        {Header: "ID", accessor: "id"},
        {Header: "Title", accessor: "title"},
        {Header: "Body", accessor: "body"},
    ];
    const filteredColumns = allColumns.filter((col) =>
        selectedColumns.has(col.accessor as string)
    ) as Column<PostData>[]

    const dropdownOptions = allColumns.map((col) => ({
        label: col.Header,
        value: col.accessor as string,
    }));
    useEffect(() => {
        if (deleteData == undefined || deleting) return;
        const status = deleteResponse?.status;
        if (status == 200 || status == 204) {
            toast({
                action: (
                    <CheckCircleIcon className="mr-2 text-green-500 w-6"/>
                ),
                key: postToDelete.id,
                title: "Success",
                description: 'Successfully deleted post',
                duration: 3000,
                variant: 'success'
            });
            refetchPosts();
        } else {
            toast({
                action: (
                    <XMarkIcon className="mr-2 text-red-500 w-6"/>
                ),
                title: "Error",
                description: "Failed to delete the post. " + (errorOnDelete?.message ?? ""),
                duration: 3000,
                variant: "error",
            });
        }
    }, [deleteResponse]);

    return (
        <>
            <ConfirmDeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} onDelete={executeDelete}/>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold text-gray-900">Posts</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            This list of posts is retrieved from open API: https://jsonplaceholder.typicode.com/posts
                        </p>
                    </div>

                    <MultiSelectDropdown formFieldName={'columns'} options={dropdownOptions}
                                         onChange={(item: string) => {
                                             if (selectedColumns.has(item)) {
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
                        <PostDetails post={viewPost}/>
                    </SheetContent>
                </Sheet>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        {!!dataToDisplay && (
                            <>
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <Table
                                        uniqueKey={'id'}
                                        enableRowSelection={true} data={dataToDisplay}
                                        onRowSelect={setSelectedPosts}
                                        columns={filteredColumns}
                                        defaultSort={{column: 'id', direction: 'asc'}} actions={[
                                        {
                                            placeholder: 'View',
                                            onClick: (post: PostData) => {
                                                setViewPost(post);
                                                setOpenModal(true);
                                            },
                                            classNames: 'text-gray-900'
                                        },
                                        {
                                            placeholder: 'Delete',
                                            onClick: (post: PostData) => {
                                                setOpenDeleteModal(true);
                                                setPostToDelete(post)
                                            },
                                            classNames: 'text-red-500'
                                        }
                                    ]}/>
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
            {selectedPosts.length > 0 && (
                <Button variant={'destructive'} onClick={() => {
                    window.alert('There is no endpoint for bulk delete, only the last selected item will be deleted');
                    setPostToDelete(selectedPosts[selectedPosts.length - 1]);
                    setOpenDeleteModal(true);
                }}>Delete posts</Button>
            )}
        </>
    )
}
