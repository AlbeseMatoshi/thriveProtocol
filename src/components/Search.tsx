export const Search =({setValue, placeholder, setCurrentPage})=>{
    return(
        <>
            <input
                className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                type="text"
                placeholder={placeholder}
                onInput={(e) => {
                    setValue(e.target.value)
                    setCurrentPage(1)
                }}
            />
        </>
    )
}