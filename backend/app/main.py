"""
=========================================================
API PRINCIPAL DO MARKETPLACE
=========================================================

Este arquivo é o ponto de entrada do backend.

Responsabilidades atuais:

- Criar a aplicação FastAPI;
- Configurar CORS;
- Disponibilizar uma rota inicial;
- Disponibilizar uma rota de saúde da API.

=========================================================
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


# =========================================================
# CRIAÇÃO DA APLICAÇÃO
# =========================================================


app = FastAPI(

    title="Marketplace Luiz API",

    description=(
        "API REST do projeto Marketplace Luiz. "
        "Backend desenvolvido em Python utilizando FastAPI."
    ),

    version="1.0.0",

)


# =========================================================
# CONFIGURAÇÃO DO CORS
# =========================================================

origins = [

    "http://127.0.0.1:5500",

    "http://localhost:5500",

]


app.add_middleware(

    CORSMiddleware,

    allow_origins=origins,

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)


# =========================================================
# ROTA PRINCIPAL
# =========================================================

@app.get("/")
def pagina_inicial():
    """
    Rota principal da API.

    Endpoint:

        GET /

    Retorna uma mensagem simples indicando
    que a API está funcionando.
    """

    return {

        "message": "Marketplace Luiz API funcionando!",

        "status": "online",

        "version": "1.0.0",

    }


# =========================================================
# HEALTH CHECK
# =========================================================

@app.get("/health")
def verificar_saude():
    """
    Verifica se a API está saudável.

    Endpoint:

        GET /health

    Essa rota será útil futuramente para:

    - monitoramento;
    - testes automatizados;
    - deploy;
    - Docker;
    - serviços de nuvem.

    """

    return {

        "status": "healthy",

        "service": "marketplace-api",

    }