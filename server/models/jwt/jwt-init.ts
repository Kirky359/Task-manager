import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function jwtInit(id: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const expiresIn: jwt.SignOptions["expiresIn"] =
    (process.env.EXPIRES_IN as jwt.SignOptions["expiresIn"]) ?? "500m";

  return jwt.sign(
    {
      userId: id,
    },
    secret,
    { expiresIn }
  );
}
