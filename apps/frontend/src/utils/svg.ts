/**
 * Build an SVG polyline path string from data points.
 */
export function linePath(data: number[], min: number, max: number, w: number, h: number, p = 2): string {
  const range = max - min || 1
  return data
    .map((v, i) => {
      const x = p + (i / (data.length - 1)) * (w - p * 2)
      const y = h - p - ((v - min) / range) * (h - p * 2)
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(' ')
}

/**
 * Build a closed SVG area path string (line + bottom edge).
 */
export function areaPath(data: number[], min: number, max: number, w: number, h: number, p = 2): string {
  const line = linePath(data, min, max, w, h, p)
  return `${line} L${(w - p).toFixed(1)} ${h} L${p} ${h} Z`
}
