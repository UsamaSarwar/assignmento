export interface DrawPointOptions {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  x: number;
  y: number;
  lastX: number | null;
  lastY: number | null;
  inkColor: string;
  pointSize: number;
}

export function drawPoint({
  ctx,
  canvas,
  x,
  y,
  lastX,
  lastY,
  inkColor,
  pointSize,
}: DrawPointOptions) {
  const canvasRect = canvas.getBoundingClientRect();

  const fixPositions = (eventX: number, eventY: number): [number, number] => {
    return [eventX - canvasRect.left, eventY - canvasRect.top];
  };

  if (lastX !== null && lastY !== null && (x !== lastX || y !== lastY)) {
    ctx.lineWidth = 2 * pointSize;
    ctx.beginPath();
    ctx.strokeStyle = inkColor;
    ctx.moveTo(...fixPositions(lastX, lastY));
    ctx.lineTo(...fixPositions(x, y));
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.fillStyle = inkColor;
  ctx.arc(...fixPositions(x, y), pointSize, 0, Math.PI * 2, true);
  ctx.fill();

  return { x, y };
}

export function clearCanvas(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function downloadCanvas(canvas: HTMLCanvasElement) {
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = canvas.toDataURL('image/png');
  a.download = 'diagram.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
