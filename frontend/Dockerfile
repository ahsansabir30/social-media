FROM node:18.12.1-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --silent || true
COPY . .
EXPOSE 3000
CMD ["npm","start"]