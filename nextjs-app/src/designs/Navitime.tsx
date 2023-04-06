import { FC } from "react";
import { createCanvasElement, get2dContext, resizeCanvas } from "@/libs/utils/canvas";
import { uploadDataURL } from "@/libs/firebase/storage";
import { StationData } from "@/types/station";
import { useCreateCanvas } from "@/hooks/useCanvas";
import { Box } from "@mui/material";

type Props = {
  station: StationData;
};

const Navitime: FC<Props> = ({ ...props }) => {
  const { station } = props;
  const stationName = station.station_name; // "月島"
  const flag = stationName;

  const canvasWidth = 1600;
  const canvasHeight = 900;

  const bgSrc = "/assets/navitime/bg-mobile.png";
  const fillStyle = "white";

  const drawCanvas = async (canvas: HTMLCanvasElement) => {
    const baseCtx = get2dContext(canvas);
    baseCtx.textAlign = "left";
    baseCtx.textBaseline = "middle";
    baseCtx.fillStyle = "#2A6318";
    let splited = `${stationName}駅`;
    let number = 0;
    const maxWidth = mesureWidth(`${stationName}駅`, canvasWidth, canvasHeight);
    if (maxWidth < 80) {
      baseCtx.font = `Bold ${240 - maxWidth * 2}px Noto Sans JP`;
      baseCtx.fillText(`${stationName}駅`, 40, 320, 1920);
    } else {
      const fontSize = maxWidth < 154 ? 96 : 80;
      const lineHeight = maxWidth < 154 ? 1.5 : 1.4;
      const offset = maxWidth < 154 ? 240 : 220;
      baseCtx.font = `Bold ${fontSize}px Noto Sans JP`;
      for (let i = 0; i < `${stationName}駅`.length; i++) {
        const width = mesureWidth(splited.slice(0, i), canvasWidth, canvasHeight);
        if (width > 64) {
          baseCtx.fillText(splited.slice(0, i), 40, number * fontSize * lineHeight + offset, 1920);
          number++;
          splited = splited.slice(i);
        } else {
          if (i === `${stationName}駅`.length - 1) {
            baseCtx.fillText(splited, 40, number * fontSize * lineHeight + offset, 1920);
          }
        }
      }
    }
    const resizedCanvas = await resizeCanvas(canvas, 1 / 2);
    return resizedCanvas;
  };

  const mesureWidth = (text: string, width: number, height: number) => {
    const canvas = createCanvasElement(width, height);
    let context = get2dContext(canvas);
    context.beginPath();
    context.font = "Noto Sans JP";
    return context.measureText(text).width;
  };

  const dataURL = useCreateCanvas(flag, canvasWidth, canvasHeight, drawCanvas, bgSrc, fillStyle);

  return (
    <Box>
      {/* eslint-disable-next-line */}
      <img src={dataURL} alt={stationName} />
    </Box>
  );
};

export default Navitime;
