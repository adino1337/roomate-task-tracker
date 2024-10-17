# Backend Dockerfile
FROM node:18-alpine

# Nastav pracovní adresář
WORKDIR /app

# Zkopíruj package.json a package-lock.json
COPY package*.json ./

# Nainstaluj závislosti
RUN npm install

# Zkopíruj zbytek aplikace
COPY . .

# Nastav proměnné prostředí
ENV PORT=5000

# Exponuj port
EXPOSE 5000

# Spusť aplikaci
CMD ["node", "server.js"]
