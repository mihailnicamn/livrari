
import { navMonitor, useNav } from './state/nav';
import { DashboardIcon, EnterIcon, ListBulletIcon } from '@radix-ui/react-icons';
import { setupIonicReact } from '@ionic/react';
import Login from './views/login';
import { Bar, BarItem } from './components/nav';
import { Layout } from './components/layout';
import Magazin from './views/magazin';
import CartIcon from './components/cartIcon';
import { useCart } from './state/cart';

setupIonicReact();
const PRODUCTS = () => {
  return (<>
    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 19V5h6v14zm14 0h-6v-7h6zm0-9h-6V5h6z" opacity="0.3" /><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M5 19V5h6v14zm14 0h-6v-7h6zm0-9h-6V5h6z" /></svg>
  </>)
}
const CART = () => {
  return (<>
    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M10 2a1.75 1.75 0 1 0 0 3.5h4A1.75 1.75 0 1 0 14 2zM3.863 16.205c-.858-3.432-1.287-5.147-.386-6.301c.901-1.154 2.67-1.154 6.207-1.154h4.63c3.538 0 5.307 0 6.208 1.154c.9 1.153.472 2.87-.386 6.301c-.546 2.183-.819 3.274-1.633 3.91c-.813.635-1.938.635-4.188.635h-4.63c-2.25 0-3.376 0-4.19-.635c-.813-.636-1.086-1.727-1.632-3.91" opacity="0.5" /><path fill="currentColor" d="M15.58 4.502a1.743 1.743 0 0 0 .002-1.501c.683.005 1.216.036 1.692.222a3.25 3.25 0 0 1 1.426 1.09c.367.494.54 1.127.776 1.998l.047.17l.512 2.964c-.408-.282-.935-.45-1.617-.55l-.361-2.087c-.284-1.04-.387-1.367-.561-1.601a1.75 1.75 0 0 0-.768-.587c-.22-.086-.486-.111-1.148-.118M8.418 3a1.743 1.743 0 0 0 .002 1.502c-.662.007-.928.032-1.148.118a1.75 1.75 0 0 0-.768.587c-.174.234-.277.561-.56 1.6l-.362 2.089c-.681.1-1.208.267-1.617.548l.512-2.962l.047-.17c.237-.872.41-1.506.776-2a3.25 3.25 0 0 1 1.426-1.089c.476-.186 1.008-.217 1.692-.222m.332 9.749a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0zM16 12a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4A.75.75 0 0 1 16 12m-3.25.75a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0z" /></svg>
  </>)
}
const ORDERS = () => {
  return (<>
    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16.755 2h-9.51c-1.159 0-1.738 0-2.206.163a3.046 3.046 0 0 0-1.881 1.936C3 4.581 3 5.177 3 6.37v14.004c0 .858.985 1.314 1.608.744a.946.946 0 0 1 1.284 0l.483.442a1.657 1.657 0 0 0 2.25 0a1.657 1.657 0 0 1 2.25 0a1.657 1.657 0 0 0 2.25 0a1.657 1.657 0 0 1 2.25 0a1.657 1.657 0 0 0 2.25 0l.483-.442a.946.946 0 0 1 1.284 0c.623.57 1.608.114 1.608-.744V6.37c0-1.193 0-1.79-.158-2.27a3.045 3.045 0 0 0-1.881-1.937C18.493 2 17.914 2 16.755 2Z" opacity="0.5" /><path stroke-linecap="round" d="M10.5 11H17M7 11h.5M7 7.5h.5m-.5 7h.5m3-7H17m-6.5 7H17" /></g></svg>
  </>)
}
const USER = () => {
  return (<>
    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="currentColor" /><path fill="currentColor" fill-opacity="0.25" fill-rule="evenodd" d="M12 13c-3.67 0-6.68 2.42-6.976 5.5c-.026.275.2.5.476.5h13a.465.465 0 0 0 .476-.5C18.68 15.42 15.67 13 12 13" clip-rule="evenodd" /></svg>
  </>)
}
const App: React.FC = () => {
  navMonitor();
  const { tab } = useNav();
  const { products } = useCart();
  const items = 0;
  return (
    <>
      <Layout>
        <Magazin />
        <Login />
      </Layout>
      <Bar>
        <BarItem path="magazin">
          <PRODUCTS />
        </BarItem>
        <BarItem path="cos" badge={products.length > 0 && products.length || undefined}>
          <CartIcon items={products.length} />
        </BarItem>
        <BarItem path="comenzi">
          <ORDERS />
        </BarItem>
        <BarItem path="login">
          <USER />
        </BarItem>
      </Bar>
    </>

  )
};

export default App;
