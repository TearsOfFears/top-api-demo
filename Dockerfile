FROM node:16.13.1-alpine
WORKDIR /app
ADD package.json package.json
RUN npm install
ADD . .

EXPOSE 3000
CMD ["cd", "app"]
CMD ["npm","run","start:dev"]