export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	username: string;
	email: string;
	password: string;
	role: string;
}

export interface AuthResponse {
	message: string;
	user?: {
		username: string;
		email: string;
		role: string;
	};
	token?: string;
}
