# Use Node.js as the base image for the build stage
FROM node:14 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./
# Copy the remaining files to the container
COPY . /app

# Install the required packages
RUN npm install
RUN npm install -g nodemon
RUN npm install mysql
EXPOSE 3000

#Lancer
CMD [ "npm" ,"start"]

# Copy the built Angular application from the build stage
COPY  . /app

