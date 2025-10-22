# API de Geração de Conteúdo com OpenAI

Esta documentação descreve como usar a nova API para gerar conteúdo baseado em múltiplos artigos usando a API do OpenAI.

## Endpoint

```
POST /articles/generate/:ids
```

### Parâmetros

- `ids`: Lista de IDs de artigos separados por vírgula (ex: `1,2,3`)

### Headers

- `Authorization`: Bearer token obtido através do endpoint de login

### Exemplo de Requisição

```bash
curl -X POST "http://localhost:3333/articles/generate/1,2,3" \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -H "Content-Type: application/json"
```

### Exemplo de Resposta

```json
{
  "title": "Título Gerado para o Conteúdo",
  "content": "Conteúdo gerado pela API do OpenAI combinando informações dos artigos solicitados...",
  "sourceArticles": [
    {
      "id": "1",
      "title": "Título do Artigo 1",
      "url": "https://exemplo.com/artigo1"
    },
    {
      "id": "2",
      "title": "Título do Artigo 2",
      "url": "https://exemplo.com/artigo2"
    },
    {
      "id": "3",
      "title": "Título do Artigo 3",
      "url": "https://exemplo.com/artigo3"
    }
  ],
  "generatedAt": "2025-09-18T17:05:23.456Z"
}
```

## Erros

### Artigos não encontrados

```json
{
  "error": "Conteúdo insuficiente",
  "message": "Nenhum dos artigos fornecidos possui conteúdo disponível para gerar um novo texto"
}
```

### Parâmetros inválidos

```json
{
  "error": "Parâmetro inválido",
  "message": "É necessário fornecer pelo menos um ID de artigo"
}
```

### Erro interno

```json
{
  "error": "Erro interno do servidor",
  "message": "Não foi possível gerar o conteúdo solicitado"
}
```

## Script de Teste

Um script de teste está disponível no arquivo `test-generate-content.sh`. Para usá-lo:

1. Certifique-se de que o servidor está rodando
2. Execute o script:

```bash
./test-generate-content.sh
```

O script irá obter um token de autenticação e fazer uma requisição para a API de geração de conteúdo.