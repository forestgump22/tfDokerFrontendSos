# Usa una imagen base de nginx
FROM nginx:alpine

# Copia los archivos HTML, CSS y JS al contenedor
COPY . /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80
