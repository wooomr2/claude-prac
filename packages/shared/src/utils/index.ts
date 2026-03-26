/** ISO 날짜 문자열을 한국어 포맷으로 변환 */
export function formatDateKo(isoString: string): string {
  return new Date(isoString).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/** 숫자를 소수점 n자리로 반올림 */
export function round(value: number, decimals = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/** 값이 범위 내에 있는지 확인 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
