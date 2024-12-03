import { useEffect, useRef } from "react";

export function useClickOutside(handler, listenCapaturing = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }
      document.addEventListener("click", handleClick, listenCapaturing);
      return () => {
        document.removeEventListener("click", handleClick, listenCapaturing);
      };
    },
    [handler, listenCapaturing]
  );
  return ref;
}
