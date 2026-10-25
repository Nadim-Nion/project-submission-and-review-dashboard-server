import { Role } from '../../generated/prisma/enums';
import { prisma } from '../../lib/prisma';
import config from '../config';
// import { User } from '../modules/user/user.model';
import bcrypt from 'bcrypt';

const seedSuperAdmin = async () => {
  // When database is connected, we'll check there is any user who is super admin

  if (!config.super_admin_password) {
    throw new Error('SUPER_ADMIN_PASSWORD is not set in .env');
  }

  // const isSuperAdminExists = await User.findOne({ role: UserRole.superAdmin });
  const isSuperAdminExists = await prisma.user.findFirst({
    where: { role: Role.SUPERADMIN },
  });

  if (isSuperAdminExists) return;

  const hashedPassword = await bcrypt.hash(config.super_admin_password!, 12);

  if (!isSuperAdminExists) {
    await prisma.user.create({
      data: {
        name: 'Super Admin',
        email: 'super-admin@gmail.com',
        password: hashedPassword,
        role: Role.SUPERADMIN,
      },
    });
  }
};

export default seedSuperAdmin;
