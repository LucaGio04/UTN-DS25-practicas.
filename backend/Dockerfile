# Dockerfile para Backend (Express + Prisma)

# Imagen base de Node.js
FROM node:20-alpine

# Instalar dependencias del sistema necesarias para Prisma
RUN apk add --no-cache openssl

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar todas las dependencias (necesitamos devDependencies para Prisma)
RUN npm ci

# Copiar schema de Prisma
COPY prisma ./prisma/

# Generar Prisma Client
RUN npx prisma generate

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando para ejecutar migraciones y luego iniciar el servidor
CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]

