import { Outlet } from 'react-router-dom';
import { ScrollableNavbar } from './ScrollableNavBar/ScrollableNavbar';

  const Layout = () => {

  return (
    <>
      <header>
        <ScrollableNavbar />
      </header>

      <main className='max-w-7xl mx-auto py-6 pt-20' > 
        <Outlet />
      </main>
    </>
  );
};

export default Layout;