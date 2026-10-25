import bcrypt from 'bcrypt';
import { prisma } from '../../../lib/prisma';
import AppError from '../../errors/AppError';
import { Prisma } from '../../../generated/prisma/client';

const registerUserIntoDB = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
    select: { id: true },
  });

  if (existingUser) {
    throw new AppError(409, 'An account with this email already exists');
  }

  // 3. Hash the password
  const passwordHash = await bcrypt.hash(userData.password, 12);

  try {
    // 4. Create the user in PostgreSQL
    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: passwordHash,
        // role: "STUDENT",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  } catch (error) {
    // The DB constraint is the real guard against the race condition
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new AppError(409, 'An account with this email already exists');
    }
    throw error; // let the global error handler deal with anything else
  }
};

// const loginUserIntoDB = async (email: string, password: string) => {};

export const AuthServices = {
  registerUserIntoDB,
  // loginUserIntoDB,
};
