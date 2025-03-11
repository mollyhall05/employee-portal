FROM node:18
WORKDIR /app
COPY backend/package.json .
RUN npm install
COPY backend .
CMD ["node", "index.js"]
EXPOSE 5000