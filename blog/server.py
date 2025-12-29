#!/usr/bin/env python3
"""
Servidor HTTP simples para o blog
Execute: python server.py
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Adicionar headers CORS para evitar problemas
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

def run_server():
    Handler = MyHTTPRequestHandler

    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("=" * 60)
        print(f"🚀 Servidor iniciado com sucesso!")
        print(f"📍 URL: http://localhost:{PORT}")
        print("=" * 60)
        print(f"\n✨ Abrindo o blog no navegador...")
        print(f"💡 Pressione Ctrl+C para parar o servidor\n")

        # Abrir navegador automaticamente
        webbrowser.open(f'http://localhost:{PORT}')

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n👋 Servidor encerrado. Até logo!")
            sys.exit(0)

if __name__ == "__main__":
    # Garantir que estamos no diretório correto
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    run_server()
