import { useNav } from "@/state/nav";
import { Button } from "./ui/button";
import React from "react";



export const Route = ({ path, children }: { path: string, children: React.ReactNode }) => {
    const { tab } = useNav();
    return tab === path ? <>{children}</> : null;
};



export const BarItem = ({ path, children }: { path: string, children: React.ReactNode }) => {
    const { setTab, tab } = useNav();
    const active = React.useMemo(() => tab === path, [tab, path]);
    const button = React.useMemo(() => {
        if (active) return <Button variant="outline" size="icon" className='bg-primary text-secondary h-10 w-12 flex items-center justify-center' onClick={() => setTab(path)}>{children}</Button>
        return <Button variant="outline" size="icon" className='h-10 w-12 flex items-center justify-center' onClick={() => setTab(path)}>{children}</Button>
    }
        , [active, children, setTab, path]);
    return <div className='flex flex-col items-center'>
        {button}
    </div>
}

export const Bar = ({ children }: { children: React.ReactNode }) => {
    return <div className='absolute bottom-0 w-screen bg-white border-t border-gray-200 h-16 flex justify-between items-center p-4'>
        {children}
    </div>
}