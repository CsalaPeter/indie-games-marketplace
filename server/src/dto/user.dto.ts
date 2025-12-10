export interface CreateUserDto {
	userId: string;
	userName: string;
	email: string;
	role: string;
}

export interface LoginDto {
	email: string;
	password: string;
}
