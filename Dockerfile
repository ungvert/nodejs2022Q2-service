# Build stage
FROM node:alpine3.16 as build
WORKDIR /build
COPY package-lock.json package.json ./
RUN npm ci
CMD [ "npm", "run" ,"build"]
COPY . .

# Runtime stage
FROM node:alpine3.16 as runtime
USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY --from=build --chown=node:node /build .
CMD [ "npm", "run" ,"start:dev"]