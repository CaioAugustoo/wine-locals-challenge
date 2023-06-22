import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_PAGE,
} from '../../constants/pagination';

export interface Result {
  skip: number;
  take: number;
}

export const getPagination = (
  page: string | number = DEFAULT_PAGINATION_PAGE,
  limit = DEFAULT_PAGINATION_LIMIT,
): Result => {
  const skip = (Number(page) - 1) * limit;

  return {
    skip,
    take: limit,
  };
};
