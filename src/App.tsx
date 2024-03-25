
import { navMonitor, useNav } from './state/nav';
import { DashboardIcon, EnterIcon, ListBulletIcon } from '@radix-ui/react-icons';
import { setupIonicReact } from '@ionic/react';
import Login from './views/login';
import { Bar, BarItem } from './components/nav';
import { Layout } from './components/layout';
import Magazin from './views/magazin';
import Cart from './views/cart';
import Orders from './views/orders';
import CartIcon from './components/cartIcon';
import { useCart } from './state/cart';
import { PRODUCTS, ORDERS, USER } from './components/icons';
import { useAccount } from './state/account';
import React from 'react';

setupIonicReact();
const App: React.FC = () => {
  navMonitor();
  const { tab } = useNav();
  const { products } = useCart();
  const { sync } = useAccount();
  const items = 0;
  React.useEffect(() => {
    sync();
  }, []);
  return (
    <>
      <Layout>
        <Cart />
        <Magazin />
        <Orders />
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
