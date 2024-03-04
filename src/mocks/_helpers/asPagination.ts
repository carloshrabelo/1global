import { PaginationResponse } from "@/types/utils";

export const paginate = <Data>(
  data: Data[],
  {
    page = 1,
    total = 12,
    total_pages = 2,
    per_page,
  }: Partial<Omit<PaginationResponse<Data>, "data">> = {},
) => ({
  page,
  per_page: per_page || data.length,
  total,
  total_pages,
  data,
});

export default paginate;
