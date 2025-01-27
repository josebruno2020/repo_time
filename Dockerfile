FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

RUN yarn build

# Expose the port on which the app will run
EXPOSE 3200

# Start the server using the production build
CMD ["yarn", "start:prod"]