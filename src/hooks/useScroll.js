import { useRef, useEffect } from "react";

// Intersection Observer API - https://developer.mozilla.org/ru/docs/Web/API/Intersection_Observer_API
export default function useScroll(parentRef, childRef, callback) {
  const observer = useRef();

  useEffect(() => {
    const options = {
      root: parentRef.current,
      rootMargin: "0px",
      threshold: 0, // чувствительность (0 или 1)
    };
    observer.current = new IntersectionObserver(([target]) => {
      if (target.isIntersecting) {
        console.log("intersected");
        callback();
      }
    }, options);

    observer.current.observe(childRef.current);

    return function () {
      observer.current.unobserve(childRef.current);
    };
  }, [callback]);
}
