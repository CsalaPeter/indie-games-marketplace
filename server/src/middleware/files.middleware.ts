import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
	destination: (_request, _file, callback) => {
		const uploadPath = "uploads/files";
		if (!fs.existsSync(uploadPath)) {
			fs.mkdirSync(uploadPath, { recursive: true });
		}
		callback(null, uploadPath);
	},
	filename: (_request, file, callback) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		callback(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
	},
});

const fileFilter = (
	_request: any,
	file: Express.Multer.File,
	callback: any,
) => {
	const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];

	if (file.fieldname === "coverImage") {
		if (allowedImageTypes.includes(file.mimetype)) {
			callback(null, true);
		} else {
			callback(
				new Error(
					"Invalid image type. Only JPG, PNG, and WebP are allowed.",
				),
				false,
			);
		}
	} else if (file.fieldname === "gameFile") {
		const isExe = file.originalname.toLowerCase().endsWith(".exe");
		if (isExe) {
			callback(null, true);
		} else {
			callback(
				new Error("The game file must be an .exe executable."),
				false,
			);
		}
	} else {
		callback(null, false);
	}
};

export const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
});
