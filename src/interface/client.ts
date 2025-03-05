export interface IParams {
  [key: string]: any;
}

export interface IMessage {
  message: string;
  property: string;
}

export interface IResponse<T> {
  statusCode: number;
  messages: IMessage[];
  data: T;
  timestamp: string;
  route: string;
}

export interface IMeta {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  sortBy: Array<[string, 'ASC' | 'DESC']>;
  filter: Record<string, any>; // Dynamic filter object
}

export interface ILinks {
  current: string;
  first?: string;
  previous?: string;
  next?: string;
  last?: string;
}

export interface IPaginatedData<T> {
  data: T[];
  meta: IMeta;
  links: ILinks;
}

export interface IPaginatedResponse<T> {
  statusCode: number;
  messages: IMessage[];
  data: IPaginatedData<T>;
  timestamp: string;
  route: string;
}
