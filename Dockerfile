# 使用官方Node.js 20运行时作为基础镜像
FROM node:20-alpine

# 设置工作目录
WORKDIR /app

# 定义构建参数
ARG NEXT_PUBLIC_COMMIT_HASH
ARG NEXT_PUBLIC_COMMIT_SHORT
ARG NEXT_PUBLIC_BUILD_TIME
ARG NEXT_PUBLIC_BRANCH

# 设置环境变量
ENV NEXT_PUBLIC_COMMIT_HASH=$NEXT_PUBLIC_COMMIT_HASH
ENV NEXT_PUBLIC_COMMIT_SHORT=$NEXT_PUBLIC_COMMIT_SHORT
ENV NEXT_PUBLIC_BUILD_TIME=$NEXT_PUBLIC_BUILD_TIME
ENV NEXT_PUBLIC_BRANCH=$NEXT_PUBLIC_BRANCH

# 复制package.json和package-lock.json（如果存在）
COPY package*.json ./

# 安装所有依赖
RUN npm ci

# 复制应用源代码
COPY . .

# 构建Next.js应用
RUN npm run build

# 创建非root用户以提高安全性
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# 更改文件所有权
USER nextjs

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]
