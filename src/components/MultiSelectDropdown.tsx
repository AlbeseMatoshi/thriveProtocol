import {ArrowUturnDownIcon} from "@heroicons/react/16/solid";

export default function MultiSelectDropdown({
                                                formFieldName,
                                                options,
                                                items,
                                                onChange,
                                            }: {
    formFieldName: string,
    items: Set<string>,
    options: {value: string, label: string}[],
    onChange: (value: string) => void,
}) {


    return (
        <label className="relative">
            <input type="checkbox" className="hidden peer" />

                <p className={'mx-3 border border-gray-300 p-1.5 rounded-lg px-7 text-gray-900 text-sm text-bold flex'}>
                    <span>Dropdown</span>
                    <span className={'ml-3'}><ArrowUturnDownIcon className={'size-3 mt-1'}/></span>
                </p>

            <div className="absolute bg-white ml-4 mt-1 rounded-lg w-36 border transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto">
                <ul>
                    {options?.map((option) => (
                        <li key={option.value}>
                            <label className="flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-50 [&:has(input:checked)]:bg-white">
                                <input
                                    type="checkbox"
                                    name={formFieldName}
                                    value={option.value}
                                    checked={items.has(option.value)}
                                    onChange={() => onChange(option.value)}
                                    className="cursor-pointer"
                                />
                                <span className="ml-1">{option.label}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </label>
    );
}
