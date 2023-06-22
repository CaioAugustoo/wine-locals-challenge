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
): Result => {
  const skip = (Number(page) - 1) * DEFAULT_PAGINATION_LIMIT;

  return {
    skip,
    take: DEFAULT_PAGINATION_LIMIT,
  };
};
