FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
CMD ["npm","run","start","--","--host","0.0.0.0","--port","4200"]
