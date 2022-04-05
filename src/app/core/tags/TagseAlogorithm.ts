import { TagQuery } from '../types/Types';
const queries = {
  most_sale: {
    method: 'sort',
    findQuery: {},
    query: { salesCount: 1 },
  },
};

export function tagAlgorithm(tag): TagQuery {
  return queries[tag];
}
