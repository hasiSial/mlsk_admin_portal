
# FROM node:24-alpine AS build

# WORKDIR /app

# COPY package*.json ./
# COPY tsconfig.json ./
# RUN npm install

# COPY . .
# RUN npm run build

# FROM node:24-alpine

# WORKDIR /app

# COPY package*.json ./
# RUN npm install --omit=dev

# COPY --from=build /app/dist ./dist
# # COPY --from=build /app/dev.env .env

# ENV PORT=80
# EXPOSE 80

# CMD []
### 🔹 1) Build Stage
FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build


### 🔹 2) Run Stage (NGINX)
FROM nginx:1.27-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom nginx config (create this file)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built frontend assets
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
