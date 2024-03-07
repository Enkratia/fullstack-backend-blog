FROM node:20.11.1-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm ci --cache .npm --cpu=x64 --os=linux sharp

COPY . .

RUN npm run build

CMD [ "node", "dist/main" ]

# EXPOSE 3001