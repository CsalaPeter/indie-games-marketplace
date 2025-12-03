export interface CreateUserDto {
	userName: string;
	email: string;
	role: string;
}

export interface LoginDto {
	email: string;
	password: string;
}
