export type PaginationResponse<Data> = {
  page?: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Data[];
};

export type PaginationParams = {
  page?: number;
};

export type QueryLifecyclePromises<ResultType> = {
  queryFulfilled: Promise<{
    data: ResultType;
  }>;
};
