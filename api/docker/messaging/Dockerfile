FROM php:7-cli

#Install Necessary PHP Extensions
RUN docker-php-ext-install mysqli
RUN docker-php-ext-install sockets

COPY ./src /wadapi
COPY ./vendor /wadapi/vendor

ENTRYPOINT ["php","/wadapi/messaging.php"]
