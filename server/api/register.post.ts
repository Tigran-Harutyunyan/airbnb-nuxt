
import prisma from "../../libs/prismadb";
import { hashSync } from "bcrypt-ts";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const {
        email,
        name,
        password,
    } = body;

    const hashedPassword = await hashSync(password, 12);

    try {
        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
            }
        })
        return user;
    } catch (e) {
        return e
    }
});