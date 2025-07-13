export const jwtConstants = {
  accessSecret: process.env.ACCESS_SECRET_KEY,
  refreshSecret: process.env.REFRESH_SECRET_KEY,
  refreshToken: {
    jwtOptions: {
      expiresIn: '1d',
      secret: process.env.REFRESH_SECRET_KEY,
    },
    cookieSettings: {
      httpOnly: true,
      sameSite: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1day
    },
  },
};
