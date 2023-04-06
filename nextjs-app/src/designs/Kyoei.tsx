import { FC } from "react";
import { get2dContext, resizeCanvas } from "@/libs/utils/canvas";
import { StationData } from "@/types/station";
import { useCreateCanvas } from "@/hooks/useCanvas";
import { Box } from "@mui/material";

type Props = {
  station: StationData;
};

const Kyoei: FC<Props> = ({ ...props }) => {
  const { station } = props;
  const stationName = station.station_name; // "月島"
  const flag = stationName;

  const lineName = station.line_name; // "都営大江戸線"
  const lineColor = station.line_color;
  const stationCd = station.station_cd;
  const prefName = station.pref_name; // "東京都"
  const cityName = station.city_name; // "中央区"
  const otherName = station.other; // "月島一丁目3-9"
  const companyName = station.company_name; // "東京都交通局"
  const postCode = station.post; // "104-0052"
  const lon = station.lon; // 139.784233,
  const lat = station.lat; // 35.664871,
  const status = station.e_status; // "運用中",

  const canvasWidth = 1600;
  const canvasHeight = 900;

  const drawCanvas = async (canvas: HTMLCanvasElement) => {
    const baseCtx = get2dContext(canvas);
    baseCtx.textAlign = "center";
    baseCtx.textBaseline = "middle";
    baseCtx.fillStyle = "#363636";
    baseCtx.font = "Bold 92px Noto Sans JP";
    baseCtx.fillText(`${companyName}`, canvasWidth / 2, 200, 1920);
    if (stationName.length > 8) {
      baseCtx.font = "Bold 120px Noto Sans JP";
    } else if (stationName.length > 6) {
      baseCtx.font = "Bold 160px Noto Sans JP";
    } else if (stationName.length > 4) {
      baseCtx.font = "Bold 180px Noto Sans JP";
    } else {
      baseCtx.font = "Bold 200px Noto Sans JP";
    }
    baseCtx.fillText(`${stationName}駅`, canvasWidth / 2, 380, 1920);
    baseCtx.font = "Bold 64px Noto Sans JP";
    baseCtx.fillText("駅施設内広告メニュー", canvasWidth / 2, 780, 1920);
    baseCtx.font = "Bold 60px Noto Sans JP";
    baseCtx.fillText(`${prefName} ${cityName}`, canvasWidth / 2, 550, 1920);
    const resizedCanvas = await resizeCanvas(canvas, 1 / 2);
    return resizedCanvas;
  };

  const dataURL = useCreateCanvas(
    flag,
    canvasWidth,
    canvasHeight,
    drawCanvas,
    "/assets/station/bg.png",
    lineColor
  );

  return (
    <Box>
      {/* eslint-disable-next-line */}
      <img src={dataURL} alt={stationName} />
    </Box>
  );
};

export default Kyoei;
