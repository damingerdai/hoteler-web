FROM node:16.13.0 AS builder

ENV SELF_SIGNED_CERT_IN_CHAIN=true
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
RUN npm config set strict-ssl false
RUN yarn config set strict-ssl false

WORKDIR /app

COPY scripts/postinstall  /app/scripts/postinstall/
COPY package.json yarn.lock /app/
RUN yarn install

COPY . .
RUN yarn build

FROM nginx:1.16.1
COPY _nginx/default.conf /etc/nginx/conf.d/
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist/hoteler .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
