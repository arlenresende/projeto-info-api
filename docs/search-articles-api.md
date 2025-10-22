# API de Busca de Artigos

Esta documentação descreve como usar a API para buscar artigos, incluindo a funcionalidade de busca por palavra-chave.

## Endpoint para Listar Artigos

```
GET /articles
```

### Parâmetros de Query

- `page`: Número da página (padrão: 1)
- `limit`: Número de itens por página (padrão: 10)
- `source`: Filtrar por fonte do artigo (opcional)
- `search`: Buscar por palavra-chave no título ou conteúdo (opcional)

### Headers

- `Authorization`: Bearer token obtido através do endpoint de login

### Exemplo de Requisição Básica

```bash
curl -X GET "http://localhost:3333/articles?page=1&limit=10" \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

### Exemplo de Requisição com Busca por Palavra-chave

```bash
curl -X GET "http://localhost:3333/articles?page=1&limit=10&search=economia" \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

### Exemplo de Resposta

```json
{
  "articles": [
    {
      "id": "1",
      "title": "Economia brasileira cresce acima do esperado no primeiro trimestre",
      "url": "https://exemplo.com/artigo1",
      "content": "Conteúdo do artigo...",
      "category": "Economia",
      "source": "fonte1",
      "mostRead": true,
      "watchlist": false,
      "createdAt": "2025-09-18T17:05:23.456Z",
      "updatedAt": "2025-09-18T17:05:23.456Z"
    },
    // ... outros artigos
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 42,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Endpoint para Listar Artigos por Fonte

```
GET /articles/:source
```

### Parâmetros de URL

- `source`: Nome da fonte dos artigos

### Parâmetros de Query

- `page`: Número da página (padrão: 1)
- `limit`: Número de itens por página (padrão: 10)
- `search`: Buscar por palavra-chave no título ou conteúdo (opcional)

### Exemplo de Requisição

```bash
curl -X GET "http://localhost:3333/articles/g1?page=1&limit=10&search=política" \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

## Erros

### Erro interno

```json
{
  "error": "Erro interno do servidor",
  "message": "Não foi possível buscar os artigos"
}
```

## Script de Teste

Um script de teste está disponível no arquivo `test-search.sh`. Para usá-lo:

1. Certifique-se de que o servidor está rodando
2. Execute o script:

```bash
./test-search.sh
```

O script irá obter um token de autenticação e fazer requisições para a API de busca de artigos com diferentes parâmetros de busca.