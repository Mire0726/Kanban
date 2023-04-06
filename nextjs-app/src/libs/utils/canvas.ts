/**
 * dataURL から img要素を作成する
 * @param {string} dataURL
 */
export const createImageElement = (dataURL: string) => {
  const image = new Image();
  image.src = dataURL;
  return image;
};

/**
 * 指定された横・縦の長さのcanvasを作成します
 * @param {number} width
 * @param {number} height
 */
export const createCanvasElement = (width: number, height: number) => {
  let canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

export const get2dContext = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext("2d");
  return context as CanvasRenderingContext2D;
};

export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
};

export const resizeCanvas = async (
  canvas: HTMLCanvasElement,
  ratio: number
): Promise<HTMLCanvasElement> => {
  const canvasWidth = canvas.width * ratio;
  const canvasHeight = canvas.height * ratio;
  const bgCanvas = createCanvasElement(canvasWidth, canvasHeight);
  const bgCtx = get2dContext(bgCanvas);
  const image = await loadImage(canvas.toDataURL("image/png"));
  bgCtx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
  return bgCanvas;
};

export const downloadImg = (id: string, fileName: string) => {
  let link = document.getElementById(id) as HTMLAnchorElement;
  link.download = fileName;
  return link;
};

export const judgeBrowser = () => {
  const agent = window.navigator.userAgent.toLowerCase();
  if (agent.indexOf("chrome") != -1) {
    return "chrome";
  } else if (agent.indexOf("safari") != -1) {
    return "safari";
  }
};

const createRoundRectPath = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arc(x + w - r, y + r, r, Math.PI * (3 / 2), 0, false);
  ctx.lineTo(x + w, y + h - r);
  ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * (1 / 2), false);
  ctx.lineTo(x + r, y + h);
  ctx.arc(x + r, y + h - r, r, Math.PI * (1 / 2), Math.PI, false);
  ctx.lineTo(x, y + r);
  ctx.arc(x + r, y + r, r, Math.PI, Math.PI * (3 / 2), false);
  ctx.closePath();
};

export const fillRoundRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) => {
  createRoundRectPath(ctx, x, y, w, h, r);
  ctx.fill();
};

export const resizedFontSize = (canvasWidth: number, keyword: string, fontSize: number) => {
  let newFontSize = fontSize || 160;
  const sampleCanvas = createCanvasElement(10, 10);
  const sampleCtx = get2dContext(sampleCanvas);
  sampleCtx.font = `Bold ${newFontSize}px IrohaKakuC`;
  const metrics = sampleCtx.measureText(keyword);
  let width = metrics.width;
  while (width > canvasWidth) {
    // もしサイズを超えていたら10px小さくする
    newFontSize -= 10;
    sampleCtx.font = `Bold ${newFontSize}px IrohaKakuC`;
    const metrics = sampleCtx.measureText(keyword);
    width = metrics.width;
  }
  return newFontSize;
};

/*const recordMovie = async () => {
  setIsModalOpen(true);
  setBlobURL(null);
  // ムービーを録画
  const movieHeight = 1600;
  const movieWidth = 900;
  const movieCanvas = createCanvasElement(movieWidth, movieHeight);
  const browser = judgeBrowser();
  const ext = browser === "safari" ? "mp4" : "webm";
  const movieCtx = get2dContext(movieCanvas);
  movieCtx.fillStyle = "white";
  movieCtx.fillRect(0, 0, movieWidth, movieHeight);
  const stream = movieCanvas.captureStream();
  const mimeType =
    browser === "safari" ? `video/${ext};codecs=avc1.640028` : `video/${ext};codecs=vp9`;
  const recorder = new MediaRecorder(stream, { mimeType });
  recorder.ondataavailable = function (e) {
    let videoBlob = new Blob([e.data], { type: e.data.type });
    let blobURL = window.URL.createObjectURL(videoBlob);
    anchorRef.current.download = `${dateId}-movie.${ext}`;
    anchorRef.current.href = blobURL;
    setBlobURL(blobURL);
  };
  let allCanvas: HTMLCanvasElement[] = [];
  const mobileHeight = getMobileHeight("portrait");
  const canvas1 = await createStartCanvas("portrait");
  allCanvas.push(canvas1);
  for (let i = 0; i < reversedTrends.length; i++) {
    const trendCanvas = await createTrendCanvas(
      i,
      reversedTrends[i],
      reversedTrends[i].keyword,
      reversedTrends[i].description,
      "portrait"
    );
    allCanvas.push(trendCanvas);
  }
  const canvas2 = await createEndCanvas("portrait");
  const whiteCanvas = await createBaseCanvas("portrait", "transparent");
  allCanvas.push(canvas2);
  allCanvas.push(canvas2); // バグることがあるので
  allCanvas.push(whiteCanvas);
  recorder.start();
  for (let i = 0; i < allCanvas.length + 1; i++) {
    (function (i) {
      setTimeout(function () {
        if (i < allCanvas.length) {
          movieCtx.drawImage(
            allCanvas[i],
            (900 - canvasWidth) / 2,
            (movieHeight - mobileHeight) / 2
          );
          setCanvasImageURL(allCanvas[i].toDataURL());
        } else {
          recorder.stop();
        }
      }, i * 1000);
    })(i);
  }
};*/
