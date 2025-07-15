# Etapa 1: Build de la aplicación React
FROM node:18-alpine as build

WORKDIR /usr/src/app

# Variables de entorno para la construcción
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Copiar archivos de dependencias
COPY package*.json ./
RUN npm install
# Copiar código fuente y construir
COPY . .
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Copiar archivos construidos desde la etapa anterior
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Nginx se ejecuta automáticamente
CMD ["nginx", "-g", "daemon off;"]