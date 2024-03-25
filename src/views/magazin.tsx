import { Route } from "@/components/nav"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import { useSpring, animated } from "react-spring";
import { useGesture } from "react-use-gesture";
import { shrink } from "@/lib/utils";
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
import { useProducts } from "@/state/products";
import { useCategories } from "@/state/categories";
import CartIcon from "@/components/cartIcon";
import { SEARCH, CART_FILL, CART_EMPTY, CHECKMARK } from "@/components/icons";
const descLimit = 100;
const Search = () => {
    const { selected } = useCategory()
    const { categories } = useCategories()
    const { search, setSearch, fetchProducts } = useProducts()
    const category = React.useMemo(() => categories.find((c) => c._id === selected), [categories, selected])
    const placeholder = React.useMemo(() => selected ? `Caută ${category.name}` : `Caută Produse`, [category])
    return (<>
        <div className="flex items-center justify-center flex-row p-2 gap-2">
            <Input className="w-full h-10 p-2 border border-gray-300 rounded-md" placeholder={placeholder} value={search} onChange={(e) => setSearch(e.target.value)} />
            <Button size="icon" variant="ghost" className="h-10 w-10" onClick={() => {
                fetchProducts()
            }}>
                <SEARCH />
            </Button>
        </div>
    </>)
}
const ProductCart = ({ product }: { product: any }) => {
    const { open, display, hide, getQuantity } = useCart()
    const items = getQuantity(product._id)
    const hasItems = React.useMemo(() => items > 0, [items])
    return (<>
        <div className="relative">
            <Button size="icon" variant="default" className="h-10 w-10" onClick={() => display(product)}>
                {hasItems ? <CART_FILL /> : <CART_EMPTY />}
            </Button>
            {hasItems && <Badge variant="default" className="rounded-full absolute top-[-10px] right-[-10px]">
                {items}
            </Badge>}
        </div>
    </>)
}
const ProductTitle = ({ product }: { product: any }) => {
    return (<>
        <div className="flex items-center justify-center flex-col ml-2">
            <span className="text-lg font-start text-start w-full">{product?.name}</span>
            <span className="text-sm text-semibold w-full">{product?.price} lei</span>
        </div>
    </>)
}
const SmallProductTitle = ({ product }: { product: any }) => {
    return (<>
        <div className="flex items-center justify-center flex-col ml-2  min-h-[200px]">
            <span className="text-lg font-start text-start w-full">{product?.name}</span>
            {/* <span className="text-sm text-semibold w-full">{product?.price} lei</span> */}
        </div>
    </>)
}
const Product = ({ product }: { product: any }) => {
    const { display } = useProduct()
    return (<>
        <div className="p-1" >
            <Card className="flex items-center justify-between p-2 w-full h-full">
                <div className="flex items-center justify-center flex-row" onClick={() => display(product)}>
                    <div className="flex h-20 w-20 rounded-md overflow-hidden items-center justify-center">
                        <img src={product.image} alt={`product-${product._id}`} />
                    </div>
                    <ProductTitle product={product} />
                </div>
                <div>
                    <ProductCart product={product} />
                </div>
            </Card>
        </div>
    </>)
}
const CartDrawer = () => {
    const { open, hide, onSwitch, product, setQuantity, getQuantity } = useCart()
    const total = React.useMemo(() => (product?.price || 0) * (product?.quantity || 0), [product?.price, product?.quantity])
    const [all, setAll] = React.useState(false)
    const description = React.useMemo(() => {
        if ((product?.description || '').length > descLimit && !all) {
            return product?.description.slice(0, descLimit) + "..."
        }
        return product?.description || ""
    }, [product, all]) as string
    return (<>
        <Drawer open={open} onClose={() => hide()}>
            <DrawerContent>
                <VerticalScrollView className="mb-2 overflow-scroll mx-auto w-full max-w-sm min-h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)]">
                    <DrawerHeader>
                        <DrawerTitle>{product?.name}</DrawerTitle>
                        <DrawerDescription>{
                            description
                        }
                            {description.length > descLimit && (
                                <Button variant="ghost" size="sm" onClick={() => setAll(!all)}>
                                    {all ? "Vezi mai putin" : "Vezi mai mult"}
                                </Button>
                            )}
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0 w-full flex items-center justify-center mb-4">
                        <Button onClick={() => setQuantity(product._id, "-")}
                        >
                            -
                        </Button>
                        <span className="mx-2">{product?.quantity}</span>
                        <Button onClick={() => setQuantity(product._id, "+")}
                        >
                            +
                        </Button>
                    </div>
                    <Card className="mx-4">
                        <CardContent className="flex justify-center items-center relative" >
                            <div className="flex rounded-md overflow-hidden items-center justify-center h-full relative">
                                <img src={product?.image} alt={`product-${product?._id}`} />
                            </div>
                            <div className="absolute bottom-4 right-4">
                                <Badge >Preț: <b>{product?.price} lei</b></Badge>
                            </div>
                        </CardContent>
                    </Card>
                    <DrawerFooter>
                        <div className="flex items-center justify-center w-full p-4">
                            <Button onClick={() => hide()} variant="default" className="w-full">
                                Continuă cumpărăturile</Button>
                        </div>
                    </DrawerFooter>
                </VerticalScrollView>
            </DrawerContent>
        </Drawer>
    </>)
}
const SmallProduct = ({ product, onSwitch }: { product: any, onSwitch: (product: any) => void }) => {
    return (<>
        <div className="p-1 min-h-[200px]" onClick={() => {
            onSwitch(product)
        }}>
            <Card className="flex items-center justify-between p-2 w-full h-full relative">
                <div className="flex items-center justify-center flex-col min-h-[200px]">
                    <div className="flex h-20 w-20 rounded-md overflow-hidden items-center justify-center">
                        <img src={product?.image} alt={`product-${product?._id}`} />
                    </div>
                    <SmallProductTitle product={product} />
                    <div className="absolute bottom-4 right-4">
                        <Badge >{product?.price} lei</Badge>
                    </div>
                </div>
            </Card>
        </div>
    </>)
}
const SimilarProducts = ({ category, onSwitch }: { category: string, onSwitch: (product: any) => void }) => {
    const [products, setProducts] = React.useState<any[]>([])
    const { fetchProducts } = useProducts()
    React.useEffect(() => {
        fetchProducts(category).then((data) => {
            setProducts(data)
        })
    }, [])
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
            orientation="horizontal"
            className="w-full min-h-[200px]"
        >
            <CarouselContent className="-mt-1 min-h-[200px] w-full">
                {products.map((product, index) => (
                    <CarouselItem key={index} className="pt-1 basis-1/2 w-full min-h-[200px]">
                        <SmallProduct product={product} onSwitch={onSwitch} />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel >
    </>)

}
function VerticalScrollView(props: { children: React.ReactNode, className: string }) {
    const ref = React.useRef() as any;
    const isDragging = React.useRef(false);
    const [{ y }, set, stop] = useSpring(() => ({ y: 0 })) as any;
    const bind = useGesture(
        {
            onDrag({ down, movement: [, y], first, last }) {
                if (first) isDragging.current = true;
                if (last) setTimeout(() => (isDragging.current = false), 0);
                set({ y: -y, immediate: down });
            },
            onClickCapture(ev: any) {
                if (isDragging.current) {
                    ev.stopPropagation();
                }
            },
            onWheelStart() {
                // Stop any user-land scroll animation from confcliting with the browser
                stop();
            }
        },
        {
            drag: {
                axis: "y",
                filterTaps: true,
                initial() {
                    return [0, -ref.current.scrollTop];
                }
            }
        }
    );

    return (
        <animated.div
            ref={ref}
            scrollTop={y}
            className={props.className}
            {...bind()}
        >
            {props.children}
        </animated.div>
    );
}

const ProductDrawer = () => {
    const { display, setQuantity, getQuantity, setProduct } = useCart()
    const { product, open, hide, onSwitch } = useProduct()
    const [all, setAll] = React.useState(false)
    const description = React.useMemo(() => {
        if ((product?.description || '').length > descLimit && !all) {
            return product?.description.slice(0, descLimit) + "..."
        }
        return product?.description || ""
    }, [product, all]) as string
    return (<>
        <Drawer open={open} onClose={() => hide()}>
            <DrawerContent className=" overflow-scroll">
                <VerticalScrollView className="mb-2 overflow-scroll mx-auto w-full max-w-sm min-h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)]">
                    <DrawerHeader>
                        <DrawerTitle>{product?.name}</DrawerTitle>
                        <DrawerDescription>
                            {description}
                            {description.length > descLimit && (
                                <Button variant="ghost" size="sm" onClick={() => setAll(!all)}>
                                    {all ? "Vezi mai putin" : "Vezi mai mult"}
                                </Button>
                            )}
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0 h-[calc(100%-150px)]">
                        <Card>
                            <CardContent>
                                <div className="flex rounded-md overflow-hidden items-center justify-center h-full relative">
                                    <img src={product?.image} alt={`product-${product?._id}`} />
                                    <div className="absolute bottom-4 right-4">
                                        <Badge
                                            onClick={() => new Promise((resolve) => {
                                                const quantity = getQuantity(product?._id)
                                                if (quantity > 0) {
                                                    hide();
                                                    setTimeout(() => {
                                                        display(product);
                                                        resolve(true)
                                                    }, 200);
                                                } else {
                                                    hide();
                                                    setTimeout(() => {
                                                        setProduct(product)
                                                        setQuantity(product?._id, "+")
                                                        display(product);
                                                        resolve(true)
                                                    }, 200);
                                                }
                                            })}>
                                            <CartIcon items={getQuantity(product?._id)} />
                                            {product?.price} lei
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <DrawerFooter className="flex flex-row items-center justify-center">
                        <SimilarProducts category={product?.category} onSwitch={onSwitch} />
                    </DrawerFooter>
                </VerticalScrollView>
            </DrawerContent>
        </Drawer >
    </>)
}
const ProductRow = () => {
    const { selected, select, deselect, isSelected } = useCategory()
    const { categories, fetchCategories } = useCategories();
    React.useEffect(() => {
        fetchCategories()
    }, [])
    return (<>
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            {...!selected ? {
                plugins: [
                    Autoplay({
                        delay: 8000,
                    }),
                ]
            } : {}}
            className="w-full max-w-sm p-2"
        >
            <CarouselContent>
                {categories.map((category) => {
                    const selected = isSelected(category._id.toString())
                    return (
                        <CarouselItem key={category._id} className="basis-1/3 relative" onClick={() => {
                            if (selected) {
                                deselect(category._id.toString())
                            } else {
                                select(category._id.toString())
                            }
                        }}>
                            {selected && (
                                <div className="absolute top-[-3px] right-0">
                                    <Badge variant="default" className="rounded-full">
                                        <CHECKMARK />
                                    </Badge>
                                </div>)}
                            <Card className="overflow-hidden" >
                                {/* <span className="text-3xl font-semibold">{index + 1}</span> */}
                                <div className="flex h-20 w-20 rounded-md overflow-hidden items-center justify-center">
                                    <img src={category.image} alt={`product-${category._id}`} />
                                </div>
                            </Card>
                            <div className="absolute bottom-0 left-4">
                                <Badge variant="default" className="rounded-full">
                                    {shrink(category.name, 10)}
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
    const { products, fetchProducts, setCategory } = useProducts()
    React.useEffect(() => {
        setCategory(selected!)
        fetchProducts()
    }, [selected])
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
                {products.map((product, index) => (
                    <CarouselItem key={index} className="pt-1 basis-1">
                        <Product product={product} />
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
        <CartDrawer />
        <ProductDrawer />
    </>)
}

export default () => (<Route path="magazin"><Magazin /></Route>)