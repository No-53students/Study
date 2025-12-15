# 使用官方Node.js 20运行时作为基础镜像
FROM node:20-alpine

# 设置工作目录
WORKDIR /app

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
