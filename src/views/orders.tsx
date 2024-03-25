import { Route } from "@/components/nav";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useAccount } from "@/state/account";
import React from "react";

const OrderItem = ({ order }: any) => {
    return (<>
        <div className="p-1">
            <Card className="flex items-center justify-between p-2 w-full h-full">
                <div className="flex items-center justify-center flex-row">
                    <div className="flex h-20 w-20 rounded-md overflow-hidden items-center justify-center">
                    </div>
                </div>
                <div className="text-end font-semibold">
                    Total: {order.total.toFixed(2)} lei <br />
                    Livrare: {order.deliveryFee} lei
                </div>
            </Card>
        </div>
    </>)
}

const Comenzi = () => {
    const { orders, fetchOrders } = useAccount();
    React.useEffect(() => {
        fetchOrders();
    }, []);
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
                {orders.map((order: any, index: any) => (
                    <CarouselItem key={index} className="pt-1 basis-1">
                        <OrderItem order={order} />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel >
    </>)
}



export default () => (<Route path="comenzi"><Comenzi /></Route>)