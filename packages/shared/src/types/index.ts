/** 공통 API 응답 래퍼 */
export interface IApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

/** 페이지네이션 */
export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IPaginatedResponse<T> extends IApiResponse<T[]> {
  meta: IPaginationMeta;
}
