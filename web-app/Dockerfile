FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build 
 

FROM nginx:alpine
COPY --from=node /app/dist/guru /usr/share/nginx/html
