import { createCanvasElement, get2dContext, loadImage } from "@/libs/utils/canvas";
import { useEffect, useState } from "react";

export const useCreateCanvas = (
  flag: string,
  canvasWidth: number,
  canvasHeight: number,
  drawCanvas: (canvas: HTMLCanvasElement) => Promise<HTMLCanvasElement>,
  bgSrc: string,
  fillStyle?: string
) => {
  const [dataURL, setDataURL] = useState<string>("");
  useEffect(() => {
    if (!flag) return; // 発火させるため
    console.log(flag);
    (async () => {
      let canvas = createCanvasElement(canvasWidth, canvasHeight);
      const baseCtx = get2dContext(canvas);
      baseCtx.fillStyle = fillStyle || "white";
      baseCtx.fillRect(0, 0, canvasWidth, canvasHeight);
      const bg = await loadImage(bgSrc);
      baseCtx.drawImage(bg, 0, 0);
      const drawedCanvas = await drawCanvas(canvas);
      const dataURL = drawedCanvas.toDataURL();
      setDataURL(dataURL);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag]);
  return dataURL;
};
