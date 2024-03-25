import { Route } from "@/components/nav"
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/state/cart"
import Autoplay from "embla-carousel-autoplay/components/Autoplay";
import { useSpring, animated } from "react-spring";
import { useGesture } from "react-use-gesture";

import React from "react";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useOrder } from "@/state/order";
import { CARD_DELIVERY, CARD_ONLINE, CARET_LEFT, CARET_RIGHT, CASH_DELIVERY } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { useAccount } from "@/state/account";
const ProductTitle = ({ product }: { product: any }) => {
    const name = React.useMemo(() => product?.name, [product]);
    const quantity = React.useMemo(() => product?.quantity, [product]);
    const um = React.useMemo(() => product?.um || 'buc', [product]);
    const price = React.useMemo(() => product?.price ? product?.price + ' lei' : 'indisponibil', [product]);

    return (<>
        <div className="flex items-center justify-center flex-col ml-2">
            <span className="text-lg font-start text-start w-full">{name}</span>
            <span className="text-sm text-semibold w-full"> {quantity} {um} @ {price}</span>
        </div>
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
const CartDrawer = () => {
    const { open, hide, onSwitch, product, setQuantity, getQuantity } = useCart()
    const total = React.useMemo(() => (product?.price || 0) * (product?.quantity || 0), [product?.price, product?.quantity])
    return (<>
        <Drawer open={open} onClose={() => hide()}>
            <DrawerContent>
                <VerticalScrollView className="mb-2 overflow-scroll mx-auto w-full max-w-sm min-h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)]">
                    <DrawerHeader>
                        <DrawerTitle>{product?.name}</DrawerTitle>
                        <DrawerDescription>{product?.description}</DrawerDescription>
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
const CartItem = ({ product }: { product: any }) => {
    const { display, hide, onSwitch, setProduct, setQuantity, getQuantity } = useCart()
    const price = React.useMemo(() => {
        const value = parseFloat((product.price * product.quantity).toFixed(2));
        if (isNaN(value)) return 'indisponibil';
        return value + ' lei';
    }, [product.price])
    return (<>
        <div className="p-1" onClick={() => display(product)}>
            <Card className="flex items-center justify-between p-2 w-full h-full">
                <div className="flex items-center justify-center flex-row" onClick={() => display(product)}>
                    <div className="flex h-20 w-20 rounded-md overflow-hidden items-center justify-center">
                        <img src={product.image} alt={`product-${product._id}`} />
                    </div>
                    <ProductTitle product={product} />
                </div>
                <div className="text-end font-semibold">
                    {price}
                </div>
            </Card>
        </div>
    </>)
}

const Register = () => {
    const [{ nume, prenume, parola, email, telefon }, setAccount] = React.useReducer((state: any, newState: any) => ({ ...state, ...newState }), {
        nume: '',
        prenume: '',
        parola: '',
        email: '',
        telefon: ''
    });
    const [open, setOpen] = React.useState(false);
    const { register } = useAccount();
    return (<>
        <div className='fixed bottom-0 w-screen flex justify-center items-center bg-white border-t border-gray-200 h-16 p-4'>
            <div className='mb-[150px]'>
                <Button variant="default" className="w-full rounded-xl bg-primary/90" onClick={() => {
                    setOpen(true);
                }
                }>
                    Înregistrează-te pentru a plasa o comandă
                </Button>
            </div>
        </div>
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Înregistrează-te</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2 p-4 justify-center items-center w-full">
                    <Input placeholder="Nume" value={nume} onChange={(e) => setAccount({ nume: e.target.value })} />
                    <Input placeholder="Prenume" value={prenume} onChange={(e) => setAccount({ prenume: e.target.value })} />
                    <Input placeholder="Email" value={email} onChange={(e) => setAccount({ email: e.target.value })} />
                    <Input placeholder="Telefon" value={telefon} onChange={(e) => setAccount({ telefon: e.target.value })} />
                    <Input placeholder="Parola" value={parola} onChange={(e) => setAccount({ parola: e.target.value })} />
                </div>
                <DialogFooter>
                    <div className="flex items-center flex-row justify-center w-full p-4 gap-2">
                        <Button onClick={() => {
                            register({ nume, prenume, email, telefon, parola }).then(() => {
                                setOpen(false);
                            });
                        }} variant="default" className="w-2/3">
                            Înregistrează-te
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>)
}

const OrderCart = () => {
    const { registered } = useAccount()
    const { display, setProducts } = useOrder()
    const { products } = useCart()
    const total = React.useMemo(() => products.reduce((acc: any, product: any) => acc + (parseFloat(product?.price || 0) * parseFloat(product?.quantity || 0)), 0).toFixed(2) + ' lei', [products])
    if (!registered) return <Register />
    return (<>
        <div className='fixed bottom-0 w-screen flex justify-center items-center bg-white border-t border-gray-200 h-16 p-4'>
            <div className='mb-[150px]'>
                <Button variant="default" className="w-full rounded-xl bg-primary/90" onClick={() => {
                    setProducts(products);
                    display();
                }
                }>
                    Finalizează comanda {total}
                </Button>
            </div>
        </div>
    </>)
}

const AddDeliveryAddress = ({ onSave }: any) => {
    const [open, setOpen] = React.useState(false);
    const { addAddress } = useAccount()
    const [{ nume, strada, numar, bloc, apartament, scara, cartier }, setAddress] = React.useReducer((state: any, newState: any) => ({ ...state, ...newState }), {
        nume: '',
        strada: '',
        numar: '',
        bloc: '',
        apartament: '',
        scara: '',
        cartier: ''
    });
    return (<>
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <DialogTrigger>
                <Button variant="default" className="w-full rounded-xl bg-primary/90" onClick={() => setOpen(true)}>
                    Adaugă o adresă de livrare
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adaugă o adresă de livrare</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2 p-4 justify-center items-center w-full">
                    <Input placeholder="Denumire Adresă" value={nume} onChange={(e) => setAddress({ nume: e.target.value })} />
                    <Input placeholder="Strada" value={strada} onChange={(e) => setAddress({ strada: e.target.value })} />
                    <Input placeholder="Număr" value={numar} onChange={(e) => setAddress({ numar: e.target.value })} />
                    <Input placeholder="Bloc" value={bloc} onChange={(e) => setAddress({ bloc: e.target.value })} />
                    <Input placeholder="Apartament" value={apartament} onChange={(e) => setAddress({ apartament: e.target.value })} />
                    <Input placeholder="Scara" value={scara} onChange={(e) => setAddress({ scara: e.target.value })} />
                    <Input placeholder="Cartier" value={cartier} onChange={(e) => setAddress({ cartier: e.target.value })} />
                </div>
                <DialogFooter>
                    <div className="flex items-center flex-row justify-center w-full p-4 gap-2">
                        <Button onClick={() => setOpen(false)} variant="default" className="w-1/3">
                            Anulează
                        </Button>
                        <Button onClick={() => {
                            setOpen(false);
                            onSave(
                                addAddress({ nume, strada, numar, bloc, apartament, scara, cartier })
                            );
                        }} variant="default" className="w-1/3">
                            Adaugă
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>)
}

const OrderPaymentMethod = ({ onChange }: any) => {
    const { open, hide } = useOrder()
    const [method, setMethod] = React.useState('cash');
    const buttons = React.useMemo(() => ({
        cash: {
            icon: <CASH_DELIVERY />,
            label: 'Cash la livrare',
            variant: method !== 'cash' ? 'outline' : 'default',
        },
        card: {
            icon: <CARD_DELIVERY />,
            label: 'Card la livrare',
            disabled: true,
            variant: method !== 'card' ? 'outline' : 'default',
        },
        online: {
            icon: <CARD_ONLINE />,
            label: 'Plata online',
            disabled: true,
            variant: method !== 'online' ? 'outline' : 'default',
        }
    }), [method]) as any;
    React.useEffect(() => {
        onChange(method);
    }, [method]);
    return (<>
        <div className="flex flex-col gap-2 p-4 justify-center items-center w-full">
            <Button variant={buttons.cash.variant} className="gap-2 w-3/4" onClick={() => setMethod('cash')}>
                {buttons.cash.icon}
                <div>
                    {buttons.cash.label} {buttons.cash.disabled && '(indisponibil)'}
                </div>
            </Button>
            <Button variant={buttons.card.variant} className="gap-2 w-3/4" onClick={() => setMethod('card')} disabled={buttons.card.disabled}>
                {buttons.card.icon}
                <div>
                    {buttons.card.label} {buttons.card.disabled && '(indisponibil)'}
                </div>
            </Button>
            <Button variant={buttons.online.variant} className="gap-2 w-3/4" onClick={() => setMethod('online')} disabled={buttons.online.disabled}>
                {buttons.online.icon}
                <div>
                    {buttons.online.label} {buttons.online.disabled && '(indisponibil)'}
                </div>
            </Button>
        </div>
    </>)
}

const extract = {
    time: (date: Date) => {
        const locale = 'ro-RO';
        return date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
    },
    date: (date: Date) => {
        const locale = 'ro-RO';
        const result = date.toLocaleDateString(locale, { year: 'numeric', month: '2-digit', day: '2-digit' }).split('.').reverse().join('-');
        return result;
    }
}
const format = {
    time: (time: string): Date => {
        const date = extract.date(new Date());
        return new Date(`${date}T${time}`);
    },
    date: (date: string): Date => {
        const time = extract.time(new Date());
        return new Date(`${date}T${time}`);
    }
}
const OrderSchedule = ({ onChange }: any) => {
    const { open, hide } = useOrder()
    const [date, setDate] = React.useState(new Date(Date.now() + 15 * 60 * 1000));
    const [time, setTime] = React.useState(new Date(Date.now() + 15 * 60 * 1000));
    React.useEffect(() => {
        onChange({ data: date, ora: time });
    }, [date, time]);
    return (<>
        <div className="flex flex-col gap-2 p-4 justify-center items-center w-full">
            <div className="flex flex-row justify-center items-center gap-2 w-full">
                <div className="flex flex-row justify-end items-center gap-2 w-1/4">
                    Data:
                </div>
                <Input type="date" className="w-1/2" value={extract.date(date)} onChange={(e) => setDate(new Date(e.target.value))} />
            </div>
            <div className="flex flex-row justify-center items-center gap-2 w-full">
                <div className="flex flex-row justify-end items-center gap-2 w-1/4">
                    Ora:
                </div>
                <Input type="time" className="w-1/2" value={extract.time(time)} onChange={(e) => setTime(format.time(e.target.value))} />
            </div>
        </div>
    </>)
}
const CHECK = () => (<>
    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 256 256"><path fill="currentColor" d="m243.33 90.91l-128.41 128.4a16 16 0 0 1-22.63 0l-71.62-72a16 16 0 0 1 0-22.61l24-24a16 16 0 0 1 22.57-.06l36.64 35.27l.11.11l92.73-91.37a16 16 0 0 1 22.58 0l24 23.56a16 16 0 0 1 .03 22.7" /></svg>
</>)

const getAddressString = (address: any, addressLength = 50) => {
    let string = `${address.nume}: Str. ${address.strada}, Nr. ${address.numar}, Bl. ${address.bloc}, Ap. ${address.apartament}, Sc. ${address.scara}, ${address.cartier}`;
    if (string.length > addressLength) {
        return string.slice(0, addressLength) + '...';
    }
    return string;
}
const OrderAddress = ({ onChange }: any) => {
    const { addresses } = useAccount()
    const [selected, setSelected] = React.useState<any>(addresses[0]?.id);
    const map = React.useMemo<any>(() => {
        const map = {} as any;
        addresses.forEach((address: any) => {
            map[address.id] = address;
        });
        return map;
    }, [addresses]);
    const selectedAddress = React.useMemo(() => map[selected], [selected]);
    React.useEffect(() => {
        onChange(selectedAddress);
    }, [selected]);
    return (<>
        {!selectedAddress && <AddDeliveryAddress onSave={(address: any) => {
            setSelected(address.id);
        }} />}
        <div className="flex flex-col gap-2 p-4 justify-between items-center w-full h-full">
            {selectedAddress && (<>
                <div className="flex flex-col justify-center items-center gap-2 w-full max-h-[200px] overflow-scroll py-6">
                    {addresses.map((address: any) => (<>
                        <Button variant={
                            selected === address.id ? 'default' : 'outline'
                        } className="w-full" onClick={() => setSelected(address.id)}>
                            {address.id === selected && <CHECK />} {getAddressString(address)}
                        </Button>
                    </>))}
                </div>
            </>
            )}
            {addresses.length > 0 &&
                <div>
                    <AddDeliveryAddress onSave={(address: any) => {
                        setSelected(address.id);
                    }} />
                </div>
            }
        </div>
    </>)
}

const Delivery_FEE = 10;

const ConfirmOrder = ({ data }: any) => {
    const { getTotal } = useCart();
    const { time, payment, address } = data;

    return (<div className='p-2 text-center font-semibold'>
        Comanda in valoare de {(getTotal() + Delivery_FEE).toFixed(2)} lei <br />
        va fi livrată la adresa: <br />
        <div className="flex flex-col gap-2 p-4 justify-center items-center w-full">
            <div className="flex flex-row justify-center items-center gap-2 w-full">
                {address.nume} ({address.cartier})
            </div>
            <div className="flex flex-row justify-center items-center gap-2 w-full">
                Str. {address.strada}, Nr.{address.numar}
            </div>
            <div className="flex flex-row justify-center items-center gap-2 w-full">
                Bl. {address.bloc}, Ap. {address.apartament}, Sc. {address.scara}
            </div>
        </div>
    </div>)
}
const SendOrderDrawer = () => {
    const { _id } = useAccount();
    const { open, hide, sendOrder } = useOrder()
    const { resetCart, products } = useCart()
    const [index, setStep] = React.useState(0);
    const [
        { time, payment, address },
        setOrderData
    ] = React.useReducer(
        (state: any, newState: any) => ({ ...state, ...newState }),
        {
            data: new Date(Date.now() + 15 * 60 * 1000),
            ora: new Date(Date.now() + 15 * 60 * 1000),
        }
    )
    const steps = [
        {
            name: 'Data și ora',
            description: 'Alege data și ora livrării',
            continuable: true,
            elem:
                <OrderSchedule onChange={(update: any) => setOrderData({
                    time: { ...time, ...update }
                })} />
        },
        {
            name: 'Plată',
            description: 'Selectează metoda de plată',
            continuable: true,
            elem:
                <OrderPaymentMethod onChange={(update: any) => setOrderData({
                    payment: update
                })} />
        },
        {
            name: 'Adresa',
            description: 'Completează adresa de livrare',
            continuable: true,
            elem:
                <OrderAddress onChange={(update: any) => setOrderData({
                    address: update
                })} />
        },
        {
            name: 'Confirma',
            description: 'Verifică datele și trimite comanda',
            continuable: false,
            elem:
                <ConfirmOrder data={{ time, payment, address }} />
        }
    ]
    const step = React.useMemo(() => steps[index], [index]);
    const prevStep = React.useMemo(() => steps?.[index - 1] || {
        name: 'Înapoi',
        elem: <></>
    }, [index]);
    const nav = {
        back: () => {
            setStep(index - 1);
        },
        next: () => {
            setStep(index + 1);
        }
    }
    return (<>
        <Drawer open={open} onClose={() => hide()}>
            <DrawerContent className="h-3/4">
                <DrawerHeader>
                    <DrawerTitle>Plasează comanda</DrawerTitle>
                    <DrawerDescription>
                        {step?.description}
                    </DrawerDescription>
                </DrawerHeader>
                <div className='h-full w-full flex flex-col items-center justify-center'>
                    {step?.elem}
                </div>
                <DrawerFooter>
                    <div className="flex items-center flex-row justify-center w-full p-4 gap-2">
                        {index > 0 && (<>
                            <Button onClick={nav.back} variant="default" className="w-1/3">

                                {prevStep?.name}

                            </Button>
                        </>)}
                        {step.continuable ? (<>
                            <Button onClick={nav.next} variant="default" className="w-1/3">
                                Continuă
                            </Button>
                        </>) : (<>
                            <Button onClick={() => {
                                hide();
                                sendOrder(products, _id, payment, time.data, time.ora).then(() => {
                                    resetCart();
                                });
                            }} variant="default" className="w-2/3">
                                Trimite comanda
                            </Button>
                        </>)}
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>)

}
const Cart = () => {
    const { products } = useCart()
    if (!products.length) return (<>
        <div className='flex flex-col items-center justify-center h-full w-full'>
            <div className='text-center text-xl font-semibold'>Coșul tău este gol</div>
        </div>
    </>)
    return (<>
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            orientation="vertical"
            className="w-full h-[calc(100vh-5em)]"
        >
            <CarouselContent className="-mt-1 h-[calc(100vh-5em)]">
                {products.map((product: any, index: any) => (
                    <CarouselItem key={index} className="pt-1 basis-1">
                        <CartItem product={product} />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel >
        <CartDrawer />
        <OrderCart />
        <SendOrderDrawer />
    </>)
}
const _Cart = () => {
    const { products } = useCart();
    const unique = React.useMemo(() => {
        const map = {} as any;
        products.forEach((product: any) => {
            if (!map[product._id]) {
                map[product._id] = product;
            }
            map[product._id].quantity = (map[product._id].quantity || 0) + 1;
            map[product._id].total = map[product._id].quantity * map[product._id].price;
            return true;
        });
        return Object.values(map).sort((a: any, b: any) => a.name.localeCompare(b.name));
    }, [products]);
    return (<>
        <div className='flex flex-col space-y-4 p-2 mx-4'>
            {unique.map((product: any) => <CartItem key={product._id} product={product} />)}
        </div>
    </>)
}

export default () => (<Route path="cos"><Cart /></Route>)