#!/usr/bin/env bash
#TODO asserts

SERVICE_URL=http://localhost:3000
#SERVICE_URL=https://XXXXXXX.execute-api.eu-west-3.amazonaws.com/dev

echo "Create Book:"
curl -H "Content-Type: application/json" -d '{"title":"Conversaciones con CEOs y CIOs sobre Transformación Digital y Metodologías Ágiles","author":"Roberto Canales Mora"}' ${SERVICE_URL}/books
echo
sleep 1

echo "Create Book:"
curl -H "Content-Type: application/json" -d '{"title":"Informática Profesional","author":"Roberto Canales Mora"}' ${SERVICE_URL}/books
echo
sleep 1

echo "Create Book:"
curl -H "Content-Type: application/json" -d '{"title":"Planifica Tu Éxito, De Aprendiz A Empresario","author":"Roberto Canales Mora"}' ${SERVICE_URL}/books
echo
sleep 1

echo "Create Book:"
curl -H "Content-Type: application/json" -d '{"title":"Clean Code","author":"Robert C. Martin"}' ${SERVICE_URL}/books
echo
sleep 1

echo "Get Books:"
echo ${SERVICE_URL}/books
curl -H "Content-Type: application/json" ${SERVICE_URL}/books
echo

echo "Count Authors:"
echo ${SERVICE_URL}/authors/count
curl -H "Content-Type: application/json" ${SERVICE_URL}/authors/count
echo