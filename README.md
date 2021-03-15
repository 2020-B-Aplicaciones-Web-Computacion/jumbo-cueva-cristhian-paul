# jumbo-cueva-cristhian-paul
Aplicaciones web



1)

docker network create wordpress-network

2)

docker volume create --name mariadb_data

3)
docker run -d --name mariadb \
--env ALLOW_EMPTY_PASSWORD=yes \
--env MARIADB_USER=bn_wordpress \
--env MARIADB_DATABASE=bitnami_wordpress \
--network wordpress-network \
--volume mariadb_data:/bitnami/mariadb \
bitnami/mariadb:latest

4)
docker volume create --name wordpress_data

5)
docker run -d --name wordpress \
-p 3020:8080 -p 8443:8443 \
--env ALLOW_EMPTY_PASSWORD=yes \
--env WORDPRESS_DATABASE_USER=bn_wordpress \
--env WORDPRESS_DATABASE_NAME=bitnami_wordpress \
--network wordpress-network \
--volume wordpress_data:/bitnami/wordpress \
bitnami/wordpress:latest

acceder a http://localhost:3020

Para administrar acceder a http://localhost:3020/wp-admin
Credenciales:

WORDPRESS_USERNAME: WordPress application username. Default: user
WORDPRESS_PASSWORD: WordPress application password. Default: bitnami

Info extra:
WORDPRESS_USERNAME: WordPress application username. Default: user
WORDPRESS_PASSWORD: WordPress application password. Default: bitnami
WORDPRESS_EMAIL: WordPress application email. Default: user@example.com
WORDPRESS_FIRST_NAME: WordPress user first name. Default: FirstName
WORDPRESS_LAST_NAME: WordPress user last name. Default: LastName
WORDPRESS_BLOG_NAME: WordPress blog name. Default: User's blog
WORDPRESS_SCHEME: Scheme to generate application URLs. Default: http

