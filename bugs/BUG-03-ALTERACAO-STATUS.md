# [3] Alteração no status de entrega 

**Severidade:** Crítica 
**Ambiente:** API / UI

## Passos para reproduzir
1. Ao possuir um entrega no status "Criada"
2. E acessar o detalhamento dessa entrega
3. E tentar alterar o status da entrega de criada para Entregue
4. Ou retornar a algum status que já foi passado
5. o Sistema está permitindo essa alteração e não deverria

## Resultado esperado
    A entrega só pode avançar para o próximo status do fluxo. Pular etapas não é permitido: uma entrega CRIADA não pode ir direto para ENTREGUE

## Resultado obtido
    O sistema está permitindo pular etapas e até mesmo retornar etapas. 

## Evidência
    Histórico de alterações de uma entrega de exemplo:
        "historico": [
                {
                    "status": "CRIADA",
                    "data": "2026-08-14",
                    "descricao": "Entrega registrada"
                },
                {
                    "status": "EM_TRANSITO",
                    "data": "2026-08-10",
                    "descricao": "Atualizado pela tela"
                },
                {
                    "status": "COLETADA",
                    "data": "2026-08-10",
                    "descricao": "Atualizado pela tela"
                },
                {
                    "status": "ENTREGUE",
                    "data": "2026-08-10",
                    "descricao": "Atualizado pela tela"
                },
                {
                    "status": "COLETADA",
                    "data": "2026-08-10",
                    "descricao": "Atualizado pela tela"
                },
                {
                    "status": "SAIU_ENTREGA",
                    "data": "2026-08-10",
                    "descricao": "Atualizado pela tela"
                }]

## Observações
    O erro ocorre na tela de Usuário e também chamando a seguinte API: 

    curl -X PATCH http://localhost:3000/api/entregas/1/status \
  -H 'Content-Type: application/json' \
  -d '{"status":"COLETADA","descricao":"Coletado na origem"}'