import { Request, Response, NextFunction } from "express";
import { ZodError, ZodObject } from "zod";

export const validate =
	(schema: ZodObject) =>
	(request: Request, response: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: request.body,
				query: request.query,
				params: request.params,
			});
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				return response.status(400).json({
					message: "Validation failed",
					errors: error.issues,
				});
			}
			return response.status(500).send("Internal Server Error");
		}
	};
