FROM node:14.17.0 AS builder

ENV SELF_SIGNED_CERT_IN_CHAIN=true
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
RUN npm config set strict-ssl false
RUN yarn config set strict-ssl false

WORKDIR /app

# COPY scripts/postinstall/ngcc.sh  /app/scripts/postinstall/ngcc.sh
# COPY scripts/postinstall/apexcharts.sh  /app/scripts/postinstall/apexcharts.sh
# COPY tools/postinstall/apexcharts-patch.js  /app/tools/postinstall/apexcharts-patch.js
COPY scripts/postinstall  /app/scripts/postinstall/
COPY tools/postinstall /app/tools/postinstall/
COPY package.json yarn.lock /app/
RUN yarn install

COPY . .
RUN yarn build

FROM nginx:1.16.1
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist/hoteler .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
