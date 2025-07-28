FROM postgres
ENV HOST=host.docker.internal
COPY ./docker-services/test_db/init.sql ./postgres-init.sql
COPY ./docker-services/test_db/init.sh /docker-entrypoint-initdb.d/