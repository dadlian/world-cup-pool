FROM php:7-fpm

#Install Necessary PHP Extensions
RUN docker-php-ext-install pdo pdo_mysql mysqli
RUN docker-php-ext-install sockets

COPY ./src /wadapi
COPY ./vendor /wadapi/vendor
