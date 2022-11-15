FROM mysql/mysql-server

COPY ./docker/mysql/init.sql /docker-entrypoint-initdb.d/init.sql
COPY ./docker/mysql/my.cnf /etc/my.cnf
