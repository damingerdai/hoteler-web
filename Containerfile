FROM node:24.14.1 AS builder

ENV SELF_SIGNED_CERT_IN_CHAIN=true
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
RUN npm config set strict-ssl false

WORKDIR /app

COPY package.json package-lock.json /app/
RUN CYPRESS_INSTALL_BINARY=0 npm ci --legacy-peer-deps

COPY . .
RUN npm run build

# docker run  -p 8081:80 -e BACKEND_URL='http://127.0.0.1:8443' hoteler-web -it
FROM nginx:1.29.8
COPY _nginx/default.template /etc/nginx/conf.d/default.template
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist/hoteler/browser .
COPY scripts/run.sh /scripts/scripts.sh
ENV BACKEND_URL=http://127.0.0.1:8443
RUN ["chmod", "+x", "/scripts/scripts.sh"]
ENTRYPOINT ["/scripts/scripts.sh"]
