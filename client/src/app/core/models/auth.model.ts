export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	userName: string;
	email: string;
	password: string;
	role: string;
}

export interface AuthResponse {
	message: string;
	user?: {
		userName: string;
		email: string;
		role: string;
	};
	token?: string;
}
