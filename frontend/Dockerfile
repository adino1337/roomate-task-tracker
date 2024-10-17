# Frontend Dockerfile
FROM node:18-alpine AS build

# Nastav pracovní adresář
WORKDIR /app

# Zkopíruj package.json a package-lock.json
COPY package*.json ./

# Nainstaluj závislosti
RUN npm install

# Zkopíruj zbytek aplikace
COPY . .

# Vytvoř build React aplikace
RUN npm run build

# Druhá fáze - použij nginx pro servírování
FROM nginx:alpine

# Zkopíruj build do nginx www složky
COPY --from=build /app/build /usr/share/nginx/html

# Exponuj port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
