FROM node:18.0-alpine3.15 as deps

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock .
RUN yarn install --frozen-lockfile


FROM node:18.0-alpine3.15 as builder
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY . .
COPY --from=deps /usr/src/app/node_modules ./node_modules
RUN yarn build


FROM node:18.0-alpine3.15 as runner
ENV NODE_ENV=production
WORKDIR /usr/src/app
#RUN chmod -R 777 /usr/src/app


COPY --from=builder /usr/src/app/next.config.js ./
COPY --from=builder /usr/src/app/logs ./logs
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules


EXPOSE 3000
#RUN addgroup -S landuser && adduser -S landuser -G landuser
#USER landuser

CMD ["node_modules/.bin/next", "start"]