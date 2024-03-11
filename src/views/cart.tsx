import { Route } from "@/components/nav"
import { useCart } from "@/state/cart"
import React from "react";

const CartItem = ({ product }: { product: any }) => {
    const { display, setQuantity } = useCart();
    return (<>
        <div className='flex items-center justify-between border-b border-gray-200 pb-4 mb-4'>
            <div className='flex items-center space-x-4'>
                <img src={product.image} alt={product.name} className='w-16 h-16 object-cover' />
                <div>
                    <h2 className='text-lg font-semibold'>{product.name}</h2>
                    <p className='text-sm text-gray-500'>{product.description}</p>
                </div>
            </div>
            <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-4'>
                    <button onClick={() => setQuantity(product._id, "-")} className='bg-gray-100 w-8 h-8 flex items-center justify-center rounded-md'>-</button>
                    <span>{product.quantity}</span>
                    <button onClick={() => setQuantity(product._id, "+")} className='bg-gray-100 w-8 h-8 flex items-center justify-center rounded-md'>+</button>
                </div>
                <button onClick={() => display(product)} className='bg-gray-100 w-8 h-8 flex items-center justify-center rounded-md'>...</button>
            </div>
        </div>
    </>)
}

const Cart = () => {
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
        <div className='flex flex-col space-y-4'>
            {unique.map((product: any) => <CartItem key={product._id} product={product} />)}
        </div>
    </>)
}

export default () => (<Route path="cos"><Cart /></Route>)