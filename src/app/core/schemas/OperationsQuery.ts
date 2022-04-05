import { Obj } from '../types/Types';
export class QueryOperations {
  constructor(public doc: any) {}
  pageSize(query: Obj) {
    if (!query.pageNumber) this.doc = this.doc.limit(query.pageSize);
  }
  pageNumber(query: Obj) {
    if (query.pageNumber >= 1)
      this.doc = this.doc
        .skip((query.pageNumber - 1) * query.pageSize)
        .limit(query.pageSize);
  }
}
