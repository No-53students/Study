// 构建时注入的环境变量
export const buildInfo = {
  commitHash: process.env.NEXT_PUBLIC_COMMIT_HASH || "development",
  commitShort: process.env.NEXT_PUBLIC_COMMIT_SHORT || "dev",
  buildTime: process.env.NEXT_PUBLIC_BUILD_TIME || new Date().toISOString(),
  branch: process.env.NEXT_PUBLIC_BRANCH || "local",
};
