import {
  useCallback, useRef,
  useState
} from "react";

export const useRefCallback: () => [
  (node: HTMLImageElement, index: number) => void,
  boolean
] = () => {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const updateStatus = (images: HTMLImageElement[]) => {
    setLoaded(
      images
        .filter(Boolean)
        .map((image) => image.complete)
        .every((item) => item === true)
    );
  };
  const setRef = useCallback((node: HTMLImageElement, index: number) => {
    if (node) {
      // Check if a node is actually passed. Otherwise node would be null.
      // You can now do what you need to, addEventListeners, measure, etc.
      node.addEventListener("load", () => updateStatus(imagesRef.current), {
        once: true,
      });
      node.addEventListener("error", () => updateStatus(imagesRef.current), {
        once: true,
      });
    }

    // Save a reference to the node
    imagesRef.current[index] = node;
  }, []);
  return [setRef, loaded];
};
