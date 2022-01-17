FROM node:14-alpine
FROM mysql:latest

WORKDIR /app
COPY . .
# RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcrypt
EXPOSE 3002
CMD [ "node", "index.js" ]

# RUN npm run build