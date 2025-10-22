# 🔗 URL Shortener

Um encurtador de URLs completo com suporte a URLs temporárias, desenvolvido com:

- **Backend**: Node.js (Express)
- **Frontend**: Next.js
- **Banco de dados**: MongoDB
- **Monitoramento**: Prometheus + Grafana
- **Containerização**: Docker + Docker Compose

---

## 🚀 Funcionalidades

- 🔗 Encurtamento de URLs com redirecionamento instantâneo
- ⏳ Suporte a **URLs temporárias** (com duração de 24 horas)
- 📊 Monitoramento de performance com Prometheus + Grafana
- 🐳 Ambiente containerizado com Docker

---

## 🛠️ Tecnologias Utilizadas

| Camada           | Tecnologias                            |
|------------------|----------------------------------------|
| Frontend         | Next.js                                |
| Backend          | Node.js (Express)                      |
| Banco de Dados   | MongoDB                                |
| Observabilidade  | Prometheus, Grafana                    |
| DevOps           | Docker, Docker Compose                 |

---
## 📁 Estrutura do Projeto

url-shortener/
├── backend/
│   ├── controller/
│   ├── db/
│   ├── helpers/
│   ├── models/
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── pages/
│   ├── Dockerfile
│   └── package.json
│
├── .env
├── docker-compose.yml
├── prometheus.yml
└── README.md

## 📜 Licença

Este projeto é fornecido exclusivamente para **uso educacional**. Você pode utilizá-lo para aprendizado, pesquisa e fins não comerciais. A redistribuição ou uso para fins comerciais, modificação e/ou distribuição de código não são permitidos sem permissão explícita.

- **Uso permitido**: Estudo, aprendizado, demonstrações e experiências pessoais.
- **Uso restrito**: Comercialização, modificação, distribuição ou utilização em projetos com fins lucrativos.

**Disclaimer**: O autor não se responsabiliza por qualquer dano, perda ou problema gerado pelo uso do projeto.

Este projeto está licenciado sob a licença **Educacional Não Comercial** (Educational Use Only License).


## ⚙️ Como Rodar o Projeto

### Pré-requisitos

- Docker + Docker Compose instalados

### Instruções

1. Clone o repositório:


git clone https://github.com/seu-usuario/url-shortener.git

cd url-shortener


## ⚙️ Como Rodar o Projeto

### Pré-requisitos

- Docker + Docker Compose instalados

### Instruções

1. Clone o repositório:

    ```bash
    git clone https://github.com/seu-usuario/url-shortener.git
    cd url-shortener
    ```

2. Inicie todos os serviços:

    ```bash
    docker-compose up --build
    ```

3. Acesse:

    - **Frontend**: [http://localhost:3000](http://localhost:3000)
    - **Backend API**: [http://localhost:5000](http://localhost:5000)
    - **Grafana**: [http://localhost:3002](http://localhost:3002) (usuário: admin, senha: 123456)
    - **Prometheus**: [http://localhost:9090](http://localhost:9090)

📈 **Monitoramento**  
Prometheus coleta métricas da API via endpoint `/metrics`.

Grafana exibe dashboards de:

- Latência da API
- Contagem de requisições
- Erros por endpoint
- URLs expiradas vs ativas





Limite de acessos por IP