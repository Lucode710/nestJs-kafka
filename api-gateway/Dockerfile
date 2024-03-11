FROM node:20-alpine3.19

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

COPY . .

RUN npm i

CMD [ "npm", "run", "start" ]