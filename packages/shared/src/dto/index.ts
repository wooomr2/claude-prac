/** 추후 API DTO를 여기에 추가합니다 */

/** 헬스체크 응답 */
export interface IHealthCheckDto {
  status: 'ok' | 'error';
  timestamp: string;
  service: string;
}
