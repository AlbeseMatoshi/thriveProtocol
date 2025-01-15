import React, {
    useState,
} from "react";

export const SearchContext = React.createContext({
    isVisible: true,
    setIsVisible: () => {
    },
    value: '',
    setValue: () => {
    }
} as {
    isVisible: boolean,
    setIsVisible: (visible: boolean) => void,
    value: string
    setValue: (value: string) => void,
});

export default function SearchProvider({children}: { children: JSX.Element }) {

    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [value, setValue] = useState('')

    return (
        <SearchContext.Provider
            value={{
                isVisible,
                setIsVisible,
                value,
                setValue
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}
