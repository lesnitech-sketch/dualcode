#!/bin/bash

echo "========================================"
echo "   Iniciando Dev Blog"
echo "========================================"
echo ""

# Verificar se Python está instalado
if ! command -v python3 &> /dev/null
then
    echo "❌ Python 3 não encontrado. Por favor, instale Python 3."
    exit 1
fi

python3 server.py
