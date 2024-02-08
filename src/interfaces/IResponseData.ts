export interface IRepoInfo {
  node: {
      createdAt: string;
      description?: string;
      id: string;
      name: string;
      updatedAt: string;
      url: string;
  };
}

export interface IPageInfo {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
}

export interface IResponseData {
  edges: IRepoInfo[];
  pageInfo: IPageInfo;
  repositoryCount: number;
}

export type ExtendedPageInfo<T> = IPageInfo & T;