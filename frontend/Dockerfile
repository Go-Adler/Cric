# Use an official Node.js runtime as the base image
FROM node:slim

# Install the Angular CLI globally
RUN npm install -g @angular/cli

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 4202

# Start the Angular app
CMD ng serve --port 4202