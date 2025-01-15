import {useContext, useEffect} from "react";
import {SearchContext} from "@/hooks/SearchContext.tsx";
import {ChevronRightIcon, FolderIcon, UsersIcon} from "@heroicons/react/24/outline";
import {cn} from "@/utils/util.ts";
import {Link} from "react-router-dom";


const items = [

  {
    name: 'Users',
    description: 'See the list of users',
    href: '/users',
    iconColor: 'bg-blue-500',
    icon: UsersIcon,
  },
  {
    name: 'Posts',
    description: 'See the list of posts',
    href: '/posts',
    iconColor: 'bg-pink-500',
    icon: FolderIcon,
  },
]

export default function DashboardPage() {

    const {setIsVisible} = useContext(SearchContext);

    useEffect(() => {
        setIsVisible(false);
        return () => setIsVisible(true);
    }, []);

    return (
        <div className="mx-auto max-w-lg">
            <h2 className="text-base font-semibold text-gray-900">Create your first project</h2>
            <p className="mt-1 text-sm text-gray-500">Get started by selecting a template or start from an empty
                project.</p>
            <ul role="list" className="mt-6 divide-y divide-gray-200 border-b border-t border-gray-200">
                {items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                        <div className="group relative flex items-start space-x-3 py-4">
                            <div className="shrink-0">
                <span
                    className={cn(item.iconColor, 'inline-flex size-10 items-center justify-center rounded-lg')}
                >
                  <item.icon aria-hidden="true" className="size-6 text-white"/>
                </span>
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="text-sm font-medium text-gray-900">
                                    <Link to={item.href}>
                                        <span aria-hidden="true" className="absolute inset-0"/>
                                        {item.name}
                                    </Link>
                                </div>
                                <p className="text-sm text-gray-500">{item.description}</p>
                            </div>
                            <div className="shrink-0 self-center">
                                <ChevronRightIcon aria-hidden="true"
                                                  className="size-5 text-gray-400 group-hover:text-gray-500"/>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-6 flex">
                <Link to="/404page" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Or you can try our "404" page :)
                    <span aria-hidden="true"> &rarr;</span>
                </Link>
            </div>
        </div>
    )
}
