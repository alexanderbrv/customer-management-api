#!/bin/bash
set -e

until pg_isready -h "$HOST" -p "$PORT" -U "$POSTGRES_USER"; do
  echo "Waiting for PostgreSQL to start..."
  sleep 1
done

echo "Importing data..."
psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f postgres-init.sql
echo "Data import complete."
