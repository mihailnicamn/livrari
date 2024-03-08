import { Route } from "@/components/nav"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import { For } from 'million/react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useProduct } from "@/state/product"
import { useCart } from "@/state/cart";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { useCategory } from "@/state/category";

const CART_FILL = () => {
    return (<>
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M3.04 2.292a.75.75 0 1 0-.498 1.416l.262.091c.667.235 1.106.39 1.429.549c.303.149.437.27.525.398c.09.132.16.314.2.677c.04.38.041.875.041 1.615V9.64h15.725c.33-1.658.485-2.5.052-3.063C20.332 6 18.815 6 17.13 6H6.492a9.029 9.029 0 0 0-.044-.738c-.053-.497-.17-.95-.452-1.362c-.284-.416-.662-.682-1.102-.899c-.412-.202-.936-.386-1.553-.603z" clip-rule="evenodd" /><path fill="currentColor" d="m20.2 12.187l.5-2.424l.024-.123H5c0 2.941.063 3.912.93 4.826c.866.914 2.26.914 5.05.914h5.302c1.561 0 2.342 0 2.893-.45c.552-.45.71-1.214 1.025-2.743" opacity="0.5" /><path fill="currentColor" d="M7.5 18a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m9 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3" /></svg>
    </>)
}
const CART_EMPTY = () => {
    return (<>
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M2.084 2.751a.75.75 0 0 1 .956-.459l.302.106c.616.217 1.14.401 1.552.603c.44.217.819.483 1.103.899c.282.412.398.865.452 1.362c.024.222.037.468.043.738h10.639c1.685 0 3.201 0 3.645.577c.444.577.27 1.447-.076 3.186l-.5 2.425c-.315 1.528-.473 2.293-1.025 2.742c-.551.45-1.332.45-2.893.45H10.98c-2.789 0-4.183 0-5.05-.914S5 12.582 5 9.64V7.038c0-.74 0-1.235-.041-1.615c-.04-.363-.11-.545-.2-.677c-.088-.129-.221-.25-.525-.398c-.322-.158-.761-.314-1.429-.549l-.261-.091a.75.75 0 0 1-.459-.957M7.5 18a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m9 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3" /></svg>
    </>)
}
const SEARCH = () => {
    return (<>
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20h3.627a5.25 5.25 0 1 1 8.369-6.34C22 13.153 22 12.6 22 12c0-.442 0-1.608-.002-2H2.002C2 10.392 2 11.558 2 12c0 3.771 0 5.657 1.172 6.828C4.343 20 6.229 20 10 20" opacity="0.5" /><path fill="currentColor" d="M5.25 16a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75" /><path fill="currentColor" fill-rule="evenodd" d="M17.75 14.5a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5M14 16.75a3.75 3.75 0 1 1 6.879 2.068l.901.902a.75.75 0 1 1-1.06 1.06l-.902-.901A3.75 3.75 0 0 1 14 16.75" clip-rule="evenodd" /><path fill="currentColor" d="M9.995 4h4.01c3.781 0 5.672 0 6.846 1.116c.846.803 1.083 1.96 1.149 3.884v1H2V9c.066-1.925.303-3.08 1.149-3.884C4.323 4 6.214 4 9.995 4" /></svg>
    </>)
}
const CHECKMARK = () => {
    return (<>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><g fill="currentColor"><path d="m237.66 85.26l-128.4 128.4a8 8 0 0 1-11.32 0l-71.6-72a8 8 0 0 1 0-11.31l24-24a8 8 0 0 1 11.32 0l36.68 35.32a8 8 0 0 0 11.32 0l92.68-91.32a8 8 0 0 1 11.32 0l24 23.6a8 8 0 0 1 0 11.31" opacity="0.2" /><path d="m243.28 68.24l-24-23.56a16 16 0 0 0-22.58 0L104 136l-.11-.11l-36.64-35.27a16 16 0 0 0-22.57.06l-24 24a16 16 0 0 0 0 22.61l71.62 72a16 16 0 0 0 22.63 0l128.4-128.38a16 16 0 0 0-.05-22.67M103.62 208L32 136l24-24l.11.11l36.64 35.27a16 16 0 0 0 22.52 0L208.06 56L232 79.6Z" /></g></svg>
    </>)
}

const Search = () => {
    const { selected } = useCategory()
    const placeholder = React.useMemo(() => selected ? `Caută Produse în ${selected}` : `Caută Produse`, [selected])
    return (<>
        <div className="flex items-center justify-center flex-row p-2 gap-2">
            <Input className="w-full h-10 p-2 border border-gray-300 rounded-md" placeholder={placeholder} />
            <Button size="icon" variant="ghost" className="h-10 w-10">
                <SEARCH />
            </Button>
        </div>
    </>)
}
const ProductCart = ({ items }: { items?: number }) => {
    const { open, display, hide } = useCart()
    const hasItems = React.useMemo(() => items && items > 0, [items])
    return (<>
        <div className="relative">
            <Button size="icon" variant="default" className="h-10 w-10" onClick={display}>
                {hasItems ? <CART_FILL /> : <CART_EMPTY />}
            </Button>
            {hasItems && <Badge variant="default" className="rounded-full absolute top-[-10px] right-[-10px]">
                {items}
            </Badge>}
        </div>
    </>)
}
const ProductTitle = ({ index }: { index: number }) => {
    return (<>
        <div className="flex items-center justify-center flex-col ml-2 ">
            <span className="text-lg font-semibold text-start w-full">Product</span>
            <span className="text-sm text-start w-full">{index} lei</span>
        </div>
    </>)
}
const Product = ({ index }: { index: number }) => {
    const { display } = useProduct()
    return (<>
        <div className="p-1" >
            <Card className="flex items-center justify-between p-2 w-full h-full">
                <div className="flex items-center justify-center flex-row" onClick={display}>
                    <div className="flex h-20 w-20 rounded-md overflow-hidden">
                        <img src={`https://picsum.photos/150/150?random=${Date.now() + index}`} alt="product" />
                    </div>
                    <ProductTitle index={index} />
                </div>
                <div>
                    <ProductCart items={index % 2 === 0 ? index : undefined} />
                </div>
            </Card>
        </div>
    </>)
}
const CartDrawer = () => {
    const { open, hide, onSwitch } = useCart()
    return (<>
        <Drawer open={open} onClose={() => hide()}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Move Goal</DrawerTitle>
                        <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                    </div>
                    <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    </>)
}
const ProductDrawer = () => {
    const { open, hide, onSwitch } = useProduct()
    return (<>
        <Drawer open={open} onClose={() => hide()}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm min-h-[calc(100vh-4rem)]">
                    <DrawerHeader>
                        <DrawerTitle>Move Goal</DrawerTitle>
                        <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                    </div>
                    <DrawerFooter>
                        <Button
                            onClick={onSwitch}
                        >Submit</Button>
                        <Button
                            onClick={hide}
                            variant="outline">Cancel</Button>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer >
    </>)
}
const ProductRow = () => {
    const { select, isSelected } = useCategory()
    return (<>
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            plugins={[
                Autoplay({
                    delay: 8000,
                }),
            ]}
            className="w-full max-w-sm p-2"
        >
            <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => {
                    const selected = isSelected(index.toString())
                    return (
                        <CarouselItem key={index} className="basis-1/3 relative" onClick={() => select(index.toString())}>
                            {selected && (
                                <div className="absolute top-[-3px] right-0">
                                    <Badge variant="default" className="rounded-full">
                                        <CHECKMARK />
                                    </Badge>
                                </div>)}
                            <Card className="overflow-hidden" >
                                {/* <span className="text-3xl font-semibold">{index + 1}</span> */}
                                <img src={`https://picsum.photos/150/150?random=${index}`} alt="product" />
                            </Card>
                            <div className="absolute bottom-0 left-4">
                                <Badge variant="default" className="rounded-full">
                                    Category {index}
                                </Badge>
                            </div>
                        </CarouselItem>
                    )
                })}
            </CarouselContent>
        </Carousel>
    </>)
}
const ProductList = () => {
    const { selected } = useCategory()
    return (<>
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            {...(!selected ? {
                plugins: [
                    Autoplay({
                        delay: 8000,
                    }),
                ]
            } : {})}
            orientation="vertical"
            className="w-full h-[calc(100vh-20em)]"
        >
            <CarouselContent className="-mt-1 h-[calc(100vh-12em)]">
                {Array.from({ length: 50 }).map((_, index) => (
                    <CarouselItem key={index} className="pt-1 basis-1">
                        <Product index={index} />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel >
    </>)
}
const Magazin = () => {
    return (<>
        <ProductRow />
        <Search />
        <ProductList />
        <ProductDrawer />
        <CartDrawer />
    </>)
}

export default () => (<Route path="magazin"><Magazin /></Route>)