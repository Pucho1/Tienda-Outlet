import { Outlet } from 'react-router-dom';
import NavBar from "./Navbar/NavBar";

  const Layout = () => {

  return (
    <>
      <header>
        <NavBar />
      </header>

      <main className='max-w-7xl mx-auto py-6 pt-20' > 
        <Outlet />
      </main>
    </>
  );
};

export default Layout;