export interface ICreateRegistrationRequest {
	email: string;
	password: string;
}

export interface IConfirmRegistrationRequest {
	token: string;
}
