import {useState} from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/outline";

export const Paginator = ({totalPages, initialPage = 1, onPageSelect = (_e) => {}}: {
    totalPages: number,
    initialPage?: number,
    onPageSelect?: (_e: number) => void
}) => {

    const [currentPage, setCurrentPage] = useState(initialPage);
    const changePage = (e: number) => {
        if(e <= totalPages) {
            setCurrentPage(e);
            onPageSelect(e);
        }
    }
    const generatePageNumbers = () => {
        let pages = [];
        let _currentPage = Math.max(2, Math.min(currentPage, totalPages-1));

        if(totalPages <=4) {
            for(let i=1; i<=totalPages; i++) {
                pages.push(i);
            }
        }
        let midPage= totalPages/2
        if(totalPages >4) {
            if (_currentPage <= midPage) {
                pages=[]
                pages.push(_currentPage - 1,_currentPage,_currentPage + 1,'...',totalPages);
            }
            if (_currentPage >= midPage) {
                pages=[]
                pages.push(1,'...',_currentPage - 1,_currentPage,_currentPage + 1);
            }
        }
        return pages
    };
    return (
        <>
            <div className="flex items-center justify-between border-t border-gray-200 bg-white py-3 mt-2">
                <div className="flex flex-1 justify-between sm:hidden">
                    <button
                        type="submit"
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={() => changePage(initialPage - 1)}
                        disabled={initialPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        type="submit"
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={() => changePage(initialPage + 1)}
                        disabled={initialPage === totalPages}
                    >
                        Next
                    </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">

                    <div className="flex items-center"></div>
                    <div className="flex items-center space-x-4">
                        {/* Circle skeleton for profile picture or similar */}
                        {/* Rectangular skeletons for text lines */}
                        <div className="space-y-2">
                            {/*<Skeleton className="h-9 w-[250px]" /> /!* Simulate a longer text line *!/*/}
                        </div>
                    </div>
                    :
                    <div>
                        <nav
                            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                            aria-label="Pagination"
                        >
                            <button
                                onClick={() => changePage(1)}
                                disabled={initialPage === 1}
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <ChevronLeftIcon className="h-5 w-5 -mr-3" aria-hidden="true" />
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                onClick={() => changePage(initialPage - 1)}
                                disabled={initialPage === 1}
                                className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            {generatePageNumbers().map((pageNumber) => (
                                <button
                                    key={pageNumber}
                                    onClick={() => typeof pageNumber == 'number' && changePage(pageNumber)}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                        pageNumber === initialPage
                                            ? 'bg-gray-900 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                    }`}
                                >
                                    {pageNumber}
                                </button>
                            ))}
                            <button
                                onClick={() => changePage(initialPage + 1)}
                                disabled={initialPage === totalPages}
                                className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                onClick={() => changePage(totalPages)}
                                disabled={initialPage === totalPages}
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <ChevronRightIcon className="h-5 w-5 -mr-3" aria-hidden="true" />
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}