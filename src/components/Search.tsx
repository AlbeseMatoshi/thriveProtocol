export const Search =({setValue, placeholder, setCurrentPage}:{setValue:(value:string)=>void, placeholder:string, setCurrentPage:(page:number)=>void})=>{
    return(
        <>
            <input
                className="rounded-md border-0 py-1.5 px-2 w-72 text-gray-900 shadow-sm ring-1 outline-none ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-none focus:ring-gray-400 sm:text-sm sm:leading-6"
                type="text"
                placeholder={placeholder}
                onInput={(e) => {
                    setValue((e.target as HTMLInputElement).value as string)
                    setCurrentPage(1)
                }}
            />
        </>
    )
}