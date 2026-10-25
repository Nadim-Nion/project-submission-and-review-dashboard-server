const registerUserIntoDB = async (userData: unknown) => {
  

  const existingUser = await prisma.user.findUnique({
    where: {
      email: validatedData.email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists with this email!");
  }

  // 3. Hash the password
  const passwordHash = await bcrypt.hash(validatedData.password, 12);

  try {
    // 4. Create the user in PostgreSQL
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        passwordHash,
        role: "STUDENT",
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
    // 5. Handle a duplicate email inserted concurrently
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error("User already exists with this email!");
    }

    throw error;
  }
};

const loginUserIntoDB = async (email: string, password: string) => {};

export const AuthServices = {
  registerUserIntoDB,
  loginUserIntoDB,
};
