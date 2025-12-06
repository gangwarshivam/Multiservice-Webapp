# frontend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# copy only package files first for better cache
COPY package.json package-lock.json* ./

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
