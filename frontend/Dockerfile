FROM nginx:1.25-alpine
COPY index.html /usr/share/nginx/html/index.html
EXPOSE 3000
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 3000;
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }
}
EOF
CMD ["nginx", "-g", "daemon off;"]
