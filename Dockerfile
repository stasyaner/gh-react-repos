FROM node:lts-alpine AS builder
ARG GH_TOKEN
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ENV NEXT_PUBLIC_GH_TOKEN=${GH_TOKEN}
RUN npm run build --production

FROM node:lts-alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
CMD npm start
