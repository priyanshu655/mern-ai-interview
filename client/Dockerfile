FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5713

CMD [ "npm","run","dev","--","--host" ]