import React from "react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { useNav } from "@/state/nav"
import { CART_FILL, CART_EMPTY } from "./icons"


const CartIcon = ({ items }: { items: number }) => {
    const { setTab } = useNav();
    const hasItems = React.useMemo(() => items && items > 0, [items])
    return (<>
        {hasItems ? <CART_FILL /> : <CART_EMPTY />}
    </>)
}

export { CartIcon }
export default CartIcon