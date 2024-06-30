FROM mongo

COPY ./scripts/init-db.js /docker-entrypoint-initdb.d/