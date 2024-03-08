



export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (<>
        <div className='p-2 flex flex-col min-h-[calc(100vh-4rem)]' style={{ paddingBottom: '4rem' }}>
            {children}
        </div>
    </>)
}