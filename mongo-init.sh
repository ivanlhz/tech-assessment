#!/bin/bash
set -e

mongoimport \
  --host localhost \
  --db tech_assessment_db \
  --collection users \
  --type json \
  --file /docker-entrypoint-initdb.d/DB.json \
  --jsonArray
