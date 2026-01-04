import dotenv from 'dotenv';
dotenv.config();
console.log("EMAIL:" + process.env.SELLER_EMAIL);
console.log("PASSWORD:" + process.env.SELLER_PASSWORD);
