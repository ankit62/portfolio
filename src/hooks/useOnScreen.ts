import { useEffect, useState, MutableRefObject } from "react";

const useOnScreen = <T extends Element>(
  ref: MutableRefObject<T | null>,
  rootMargin: string = "0px"
): boolean => {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, rootMargin]);

  return isIntersecting;
};

export default useOnScreen;
