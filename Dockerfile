FROM node:22.5.1 AS builder

ENV SELF_SIGNED_CERT_IN_CHAIN=true
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
RUN npm config set strict-ssl false
RUN yarn config set strict-ssl false

WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn install

COPY . .
RUN yarn build

# FROM nginx:1.25.4
# COPY _nginx/default.conf /etc/nginx/conf.d/
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
# COPY --from=builder /app/dist/hoteler .
# ENTRYPOINT ["nginx", "-g", "daemon off;"]

# docker run  -p 8081:80 -e BACKEND_URL='http://127.0.0.1:8443' hoteler-web -it
FROM nginx:1.27.3
COPY _nginx/default.template /etc/nginx/conf.d/default.template
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist/hoteler/browser .
COPY scripts/run.sh /scripts/scripts.sh
ENV BACKEND_URL=http://127.0.0.1:8443
RUN ["chmod", "+x", "/scripts/scripts.sh"]
ENTRYPOINT ["/scripts/scripts.sh"]

