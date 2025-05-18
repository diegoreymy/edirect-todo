# EDirectInsure TODO List

Este projeto é uma aplicação de gerenciamento de tarefas, dividida em frontend (Angular) e backend (Spring Boot), orquestrada com Docker Compose.

## Estrutura do Projeto

```
edirect-todo/
├─ edirect-todo-api/    # Backend: Java 17 + Spring Boot + Maven
├─ edirect-todo-ui/     # Frontend: Angular 19
└─ docker-compose.yml   # Orquestra serviços: PostgreSQL, API e UI
```

## Pré-requisitos

- Docker e Docker Compose instalados

## Execução com Docker

1. Na raiz do projeto, execute:
   ```bash
   docker-compose up --build
   ```
2. Aguarde até todos os serviços iniciarem:
   - **edirect-todo-db** (PostgreSQL)
   - **edirect-todo-api** (Spring Boot)
   - **edirect-todo-ui** (Angular)
3. Acesse no navegador:
   ```
   http://localhost:4200
   ```

