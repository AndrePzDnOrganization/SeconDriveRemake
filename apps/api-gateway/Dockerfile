FROM node:22.14

WORKDIR /app

RUN npm install -g pnpm@latest-10

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 5000

CMD ["pnpm", "run", "start:dev"]