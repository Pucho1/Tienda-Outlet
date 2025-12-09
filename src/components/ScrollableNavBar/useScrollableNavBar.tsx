import { useEffect, useRef, useState } from "react";
import { ScrollableNavbarProps } from "../../interfaces/scrollableNavBarInterface";
import filtersSelectedStore from "../../store/filtersSelected";

const useScrollableNavBar = ({ sections }: ScrollableNavbarProps) => {
  const [activeSection, setActiveSection] = useState('');
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number | null>(null);

  const { changeFilterSelected } = filtersSelectedStore();
  
  const handleScroll = (container: HTMLDivElement | null) => {
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 10);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
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

  const scrollLeft = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollBy({ left: 200, behavior: 'smooth' });
  };

  /**
   * Me lleva a una seccion de la pagina
   * @param section  section a la que se scroleara de la pantalla
   */
  const handlerFilter = (section: string) => {
    const id = section.toLowerCase().replace(/\s+/g, '-');
    changeFilterSelected({category: id ?? null});
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

    sections.forEach((section) => {
      const id = section.toLowerCase().replace(/\s+/g, '-');
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);


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
    handlerFilter,
    scrollRight,
    scrollLeft,
    handleTouchEnd,
    handleTouchStart,

}
};

export default useScrollableNavBar;