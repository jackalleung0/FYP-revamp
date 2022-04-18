import { useState, useEffect, RefObject, useMemo } from "react";

export const useOnLoadImages = (ref: RefObject<HTMLElement>) => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const updateStatus = (images: HTMLImageElement[]) => {
      console.log(images)
      setStatus(
        images.map((image) => image.complete).every((item) => item === true)
      );
    };

    if (!ref?.current) return;

    const imagesLoaded = Array.from(ref.current.querySelectorAll("img"));

    if (imagesLoaded.length === 0) {
      setStatus(true);
      return;
    }

    imagesLoaded.forEach((image) => {
      image.addEventListener("load", () => updateStatus(imagesLoaded), {
        once: true,
      });
      image.addEventListener("error", () => updateStatus(imagesLoaded), {
        once: true,
      });
    });

    return;
  }, [ref]);

  return status;
};
export const useOnLoadAllRefsImages = (...refs: RefObject<HTMLElement>[]) => {
  const [refStatus, setRefStatus] = useState<boolean[]>([]);
  const refsLength = refs.length;
  const result = useMemo(
    () => refStatus.every((entry) => entry === true),
    [refStatus]
  );

  // aim: use above hook to manage each ref state, then combine all refs state as output
  useEffect(() => {}, [refsLength]);
  return result;
};
