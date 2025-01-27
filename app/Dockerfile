# Build the application
FROM node:latest AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

# Serve the application with nginx
FROM nginx as production-stage

# Create the application directory
RUN mkdir /app

# Copy the built application files
COPY --from=build /app/dist /app

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose HTTP and HTTPS ports
EXPOSE 80
EXPOSE 443

# Mount Let's Encrypt certificates at runtime
VOLUME ["/etc/letsencrypt"]

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]