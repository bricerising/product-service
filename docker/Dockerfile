FROM node:8.11.3-alpine

# Add project files
ADD . /products-service
WORKDIR /products-service

# Create products user
RUN adduser -S products ; \
    chown -R products /products-service
USER products

# Install dependencies
RUN npm install

EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]
