# ---------- build ----------
FROM node:22-alpine AS build
WORKDIR /app

# instala deps com cache (usa lockfile se existir)
COPY package*.json ./
RUN npm ci

# build de produção → /app/dist
COPY . .
RUN npm run build

# ---------- serve ----------
FROM nginx:1.27-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
