import { useEffect } from "react";

const useScrollLock = (isOpen) => {
  useEffect(() => {
    // If the modal isn't open, do nothing
    if (!isOpen) return;

    // Save the original body overflow value so we don't break other styles
    const originalStyle = window.getComputedStyle(document.body).overflow;

    // Freeze the background body
    document.body.style.overflow = "hidden";

    // Cleanup function: Re-enable scrolling when modal closes or unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);
};

export default useScrollLock;
