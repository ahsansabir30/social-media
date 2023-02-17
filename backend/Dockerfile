FROM node:18.12.1-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .
EXPOSE 5000
CMD ["npm", "start"]