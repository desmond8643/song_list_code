import React from 'react'
import upArrow from '../src/images/up-arrow.png'

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [prevScrollPos, setPrevScrollPos] = React.useState(window.pageYOffset);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingDown = currentScrollPos > prevScrollPos;

      setIsVisible(isScrollingDown);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <img className={`scroll-to-top-button ${isVisible ? 'visible' : 'hidden'}`} onClick={scrollToTop} src={upArrow}/>
  )
}
