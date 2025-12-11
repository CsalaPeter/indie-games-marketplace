export interface CreateUserDto {
	userId: string;
	username: string;
	email: string;
	role: string;
}

export interface LoginDto {
	email: string;
	password: string;
}
