# Build the application
FROM node:latest AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

# Serve the application with nginx
FROM nginx as production-stage
RUN apt-get update && apt-get install -y certbot
RUN mkdir /app
COPY --from=build /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
EXPOSE 443
CMD ["/entrypoint.sh"]