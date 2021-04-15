import path from "path";

export const PORT = process.env['PORT'];

// jwt secrete key
export const JWT_SECRETE = 'Hr/OwDdxV5YfQ9rvAgMBAAE=';


// upload directory 
export const uploadDir = path.join(__dirname + '../../../public/uploads/');

