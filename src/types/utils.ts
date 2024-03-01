export type QueryLifecyclePromises<ResultType> = {
  queryFulfilled: Promise<{
    data: ResultType;
  }>;
};
