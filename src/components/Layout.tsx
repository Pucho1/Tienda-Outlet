import { Outlet } from 'react-router-dom';
import NavBar from "./NavBar";

  const Layout = () => {

  return (
    <>
      <header>
        <NavBar />
      </header>

      <main className='max-w-7xl mx-auto py-6 px-4 pt-20' > 
        <Outlet />
      </main>
    </>
  );
};

export default Layout;