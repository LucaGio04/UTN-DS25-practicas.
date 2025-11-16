# Dockerfile para Frontend (React + Vite)

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Argumentos de build para variables de entorno
ARG VITE_API_BASE_URL=http://localhost:3000/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código
COPY . .

# Construir la aplicación
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Copiar los archivos construidos al nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de nginx para SPA
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]

