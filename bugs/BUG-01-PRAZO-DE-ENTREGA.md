# [1] Prazo de entrega não está contablizando somente dias úteis

**Severidade:**  Alta
**Ambiente:** Ambiente local, utilizando o google chrome versão 151, postman para validação de APIs.

## Passos para reproduzir
1. Cadastre uma nova entrega informando a data de coleta e a Transportadora
2. Acesse o detalhamento da Entrega criada
3. Ao consultar o Prazo calculado, a data informada está constando com os dias não úteis 

## Resultado esperado
    O sistema deve retornar a Data de Prazo conforme a seguinte regra de negócio:

    *Regra*: data_prazo = data_coleta + prazo_dias da transportadora contados em dias úteis

## Resultado obtido
    O sistema está retornando a Data de Prazo contando os dias correntes e não somente os dias úteis

## Evidência
    Retorno da requisição de consulta de entrega:
 
                {
                    "total": 43,
                    "itens": [
                        {
                            "id": 43,
                            "codigo": "BRD-2026-91163",
                            "id_transportadora": 1,
                            "destinatario_nome": "Teste Kevin",
                            "cidade": "Sapucaia do Sul",
                            "uf": "RS",
                            "status": "CRIADA",
                            "peso_kg": 1,
                            "volumes": 1,
                            "data_coleta": "2026-08-14",
                            "data_prazo": "2026-08-17",
                            "historico": [
                                {
                                    "status": "CRIADA",
                                    "data": "2026-08-14",
                                    "descricao": "Entrega registrada"
                                }
                            ]
                        }
                    ]
                }

## Observações
    cURL para detalhamento de Entregas:

        curl -X GET "http://localhost:3000/api/entregas?page=1&limit=10&q=Teste"