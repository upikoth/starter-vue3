import type { IUser, ISession } from '@/models'

export interface IGetSessionsResponse {
	sessions: ISession[];
	limit: number;
	offset: number;
	total: number;
}

export interface ICreateSessionResponse {
	user: IUser;
}
