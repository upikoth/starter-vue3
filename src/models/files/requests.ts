export interface IUploadFileRequest {
	file: File;
}

export interface IGetFilesRequest {
	limit: number;
	offset: number;
	uploadedByUserId?: number;
}

export interface IDeleteFileRequest {
	id: number;
}

export interface IGetFileRequest {
	id: number;
}
