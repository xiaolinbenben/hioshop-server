FROM node:20-alpine AS builder

ENV TZ=Asia/Shanghai

WORKDIR /srv/hioshop

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run compile

FROM node:20-alpine AS runner

ENV TZ=Asia/Shanghai \
    NODE_ENV=production \
    PORT=8360 \
    HOST=0.0.0.0

WORKDIR /srv/hioshop

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /srv/hioshop/app ./app
COPY --from=builder /srv/hioshop/view ./view
COPY --from=builder /srv/hioshop/www ./www
COPY --from=builder /srv/hioshop/production.js ./production.js

RUN mkdir -p runtime

EXPOSE 8360

CMD ["node", "production.js"]
