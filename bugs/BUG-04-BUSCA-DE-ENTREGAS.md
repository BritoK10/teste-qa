# [4] Busca por entregas não está retornando todas as listagens 

**Severidade:** Baixa
**Ambiente:** API, UI

## Passos para reproduzir
1. Acesse a tela de listagem de entregas
2. Ao pesquisar por uma entrega o campo de busca deve ignorar acentuação e diferenças de maiúsculas/minúsculas
3. Mas isso não está acontecendo

## Resultado esperado
    Conforme a regra de negócio o sistema deve retornar na listagem a busca independente de "acentuação e diferenças de maiúsculas/minúsculas — procurar por sao paulo, SÃO PAULO ou São Paulo devolve os mesmos resultados"

## Resultado obtido
    O sistema não está retornando na listagem a busca independente de "acentuação e diferenças de maiúsculas/minúsculas — procurar por sao paulo, SÃO PAULO ou São Paulo devolve os mesmos resultados"

## Evidência
    (Para este bug em especifico não consegui inserir uma evidência concreta dentro do VS)
## Observações
