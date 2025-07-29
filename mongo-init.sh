#!/bin/bash
set -e

echo "=== Iniciando importación de datos ==="
echo "Fecha: $(date)"

# Verificar que el archivo existe
if [ ! -f "/docker-entrypoint-initdb.d/DB.json" ]; then
    echo "ERROR: DB.json no encontrado"
    exit 1
fi

echo "Archivo encontrado, tamaño: $(wc -c < /docker-entrypoint-initdb.d/DB.json) bytes"

# Esperar un poco para asegurar que MongoDB esté completamente listo
sleep 5

echo "Ejecutando mongoimport..."

mongoimport \
  --host localhost:27017 \
  --username root \
  --password password \
  --authenticationDatabase admin \
  --db tech_assessment_db \
  --collection users \
  --type json \
  --file /docker-entrypoint-initdb.d/DB.json \
  --jsonArray

echo "=== Importación completada ==="