FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

ENV NODE_ENV=production

RUN npm install -g sequelize-cli
RUN npx sequelize-cli db:migrate --env production
RUN npx sequelize-cli db:seed:all --env production

CMD ["npm", "run", "start:prod"]
