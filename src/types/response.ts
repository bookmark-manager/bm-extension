export interface Response<TData> {
  data: TData;
}

export interface ErrorResponse {
  error: string;
}

export interface ResponseFound {
  id: number;
  found: boolean;
}
