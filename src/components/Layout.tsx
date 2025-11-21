import { Outlet } from 'react-router-dom';
// import NavBar from "./Navbar/NavBar";
import { ScrollableNavbar } from './SubNavbar/ScrollableNavbar';
// import { ScrollableNavbar } from './SubNavbar/ScrollableNavbar';

  const Layout = () => {

    const sections = [
    'Inicio',
    'Sobre Nosotros',
    'Servicios',
    'Portafolio',
    'Testimonios',
    'Blog',
    'Contacto',
    'Preguntas Frecuentes',
    'Galería',
    'Equipo',
    'Recursos',
    'Careers'
  ];

  return (
    <>
      <header>
        <ScrollableNavbar sections={sections}/>
      </header>

      <main className='max-w-7xl mx-auto py-6 pt-20' > 
        <Outlet />
      </main>
    </>
  );
};

export default Layout;