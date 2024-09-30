import { Sidebar } from '../components/Sidebar'

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <div className='flex'>
            <div>
                <Sidebar />
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}