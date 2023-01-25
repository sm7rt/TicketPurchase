import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@chakra-ui/icons"
import {
  IconButton
} from "@chakra-ui/react"

export const ScrollTop = (() => {

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const toScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    handleScroll();
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {scrollPosition > 200 &&
        <IconButton
          colorScheme='primary'
          color='white.100'
          aria-label='Scroll Top'
          position='fixed'
          bottom='20px'
          right={['16px', '84px']}
          zIndex={1}
          icon={<ArrowUpIcon />}
          onClick={toScrollTop}
        />
      }
    </>
  )
})
