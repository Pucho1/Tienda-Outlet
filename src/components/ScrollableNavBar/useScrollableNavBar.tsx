import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import filtersSelectedStore from "../../store/filtersSelected";
import useCategoriesStore from "../../store/categoriesStore";
import { Category } from "../../interfaces/categories";
import { useAuthStore } from "../../store/authZustandStore";

const useScrollableNavBar = () => {
  const [activeSection, setActiveSection] = useState('');
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number | null>(null);

  const { isAuthenticated, logout } = useAuthStore();
  const { categories, getCategories } = useCategoriesStore();
  const { changeFilterSelected } = filtersSelectedStore();
  const location = useLocation();
  const navigate  = useNavigate();

  const handleScroll = (container: HTMLDivElement | null): void => {
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 10);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void  => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>): void => {
    if (touchStartRef.current === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;
    const container = e.currentTarget;

    if (Math.abs(diff) > 10) {
      if (diff > 0) {
        container.scrollBy({ left: 100, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: -100, behavior: 'smooth' });
      }
    }

    touchStartRef.current = null;
  };

  const scrollLeft = (ref: React.RefObject<HTMLDivElement | null>): void => {
    ref.current?.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = (ref: React.RefObject<HTMLDivElement | null>): void => {
    ref.current?.scrollBy({ left: 200, behavior: 'smooth' });
  };

  /**
   * Cierra la sesion del usuario eleimiando el token de sessionStorage y el estado global
   */
  const handleLogout = (): void => {
    logout();
  };

  /**
   * Me cambiua el filtro seleccionado
   * @param category  
   */
  const handlerOnClickFilter = (category: Category): void => {
    changeFilterSelected({category});

    if (location.pathname !== '/products-list') {
      navigate('/products-list');
    }
  };

  useEffect(() => {
    const handleScrollEvent = () => {
      if (desktopScrollRef.current) {
        handleScroll(desktopScrollRef.current);
      }
      if (mobileScrollRef.current) {
        handleScroll(mobileScrollRef.current);
      }
    };


    desktopScrollRef.current?.addEventListener('scroll', handleScrollEvent);
    mobileScrollRef.current?.addEventListener('scroll', handleScrollEvent);

    handleScrollEvent();

    return () => {
      desktopScrollRef.current?.removeEventListener('scroll', handleScrollEvent);
      mobileScrollRef.current?.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    categories.forEach((category) => {
      const id = category.name.toLowerCase().replace(/\s+/g, '-');
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [categories]);

  // Re-measure the scroll containers after categories change so we pick
  // the updated `scrollWidth` once the DOM has rendered the new buttons.
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      handleScroll(desktopScrollRef.current);
      handleScroll(mobileScrollRef.current);
    });

    return () => cancelAnimationFrame(rafId);
  }, [categories]);

  // Use a ResizeObserver to detect when the scroll container's content
  // or size changes (e.g. fonts/images load, or categories are rendered)
  // and re-evaluate arrows accordingly.
  // useEffect(() => {
  //   if (typeof window === 'undefined') return;

  //   let ro: ResizeObserver | null = null;

  //   if (typeof (window as any).ResizeObserver !== 'undefined') {
  //     ro = new (window as any).ResizeObserver(() => {
  //       handleScroll(desktopScrollRef.current);
  //       handleScroll(mobileScrollRef.current);
  //     });

  //     if (desktopScrollRef.current) ro.observe(desktopScrollRef.current);
  //     if (mobileScrollRef.current) ro.observe(mobileScrollRef.current);
  //   } else {
  //     // Fallback: re-check on window resize
  //     const onResize = () => {
  //       handleScroll(desktopScrollRef.current);
  //       handleScroll(mobileScrollRef.current);
  //     };
  //     window.addEventListener('resize', onResize);
  //     return () => window.removeEventListener('resize', onResize);
  //   }

  //   return () => {
  //     ro?.disconnect();
  //   };
  // }, [categories]);


  return {
    activeSection, 
    setActiveSection, 
    showLeftArrow, 
    setShowLeftArrow, 
    showRightArrow, 
    setShowRightArrow,
    desktopScrollRef,
    mobileScrollRef,
    touchStartRef,
    handleScroll,
    handlerOnClickFilter,
    scrollRight,
    scrollLeft,
    handleTouchEnd,
    handleTouchStart,
    categories,
    isAuthenticated,
    handleLogout,
  }
};

export default useScrollableNavBar;