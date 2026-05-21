# --- ÉTAPE 1 : Le Build ---
FROM node:20-alpine AS build-stage

WORKDIR /app

# On copie uniquement les fichiers de configuration pour mettre le cache en cache
COPY package*.json ./

# On installe les dépendances
RUN npm install

# On copie le reste du code source
COPY . .

# On compile l'application pour la production (génère le dossier /app/dist)
RUN npm run build

# --- ÉTAPE 2 : La Production avec Nginx ---
FROM nginx:alpine

# On copie les fichiers compilés de l'étape précédente vers le dossier public de Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# On expose le port 80 (port HTTP standard)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]