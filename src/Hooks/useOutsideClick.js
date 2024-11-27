import { useEffect, useRef } from "react";

/* eslint-disable no-unused-vars */
export function useOutsideClick(functionClick, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        !e.target.classList.contains("no-click-outside")
      ) {
        functionClick();
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [functionClick, listenCapturing]);

  return ref;
}
