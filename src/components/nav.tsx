import { useNav } from "@/state/nav";
import { Button } from "./ui/button";
import React from "react";
import { Badge } from "./ui/badge";



export const Route = ({ path, children }: { path: string, children: React.ReactNode }) => {
    const { tab } = useNav();
    return tab === path ? <>{children}</> : null;
};



export const BarItem = ({ path, children, badge }: { path: string, children: React.ReactNode, badge?: React.ReactNode }) => {
    const { setTab, tab } = useNav();
    const active = React.useMemo(() => tab === path, [tab, path]);
    const button = React.useMemo(() => {
        if (active) return <Button variant="outline" size="icon" className='bg-primary text-secondary h-10 w-12 flex items-center justify-center' onClick={() => setTab(path)}>{children}</Button>
        return <Button variant="outline" size="icon" className='h-10 w-12 flex items-center justify-center' onClick={() => setTab(path)}>{children}</Button>
    }
        , [active, children, setTab, path]);
    return (<>
        <div className='flex flex-col items-center relative'>
            {button}
            {badge && <div className='rounded-full absolute top-[-10px] right-[-10px]'>
                <Badge>{badge}</Badge>
            </div>}
        </div>
    </>)
}

export const Bar = ({ children }: { children: React.ReactNode }) => {
    return <div className='fixed bottom-0 w-screen bg-white border-t border-gray-200 h-16 flex justify-between items-center p-4'>
        {children}
    </div>
}