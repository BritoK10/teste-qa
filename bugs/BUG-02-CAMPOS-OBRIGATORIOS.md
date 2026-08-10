# [2] Criação de Novas Entregas sem o preenchimento de campos obrigatórios

**Severidade:**  Alta 
**Ambiente:** API, UI 

## Passos para reproduzir
1. Acesse o cadastro de novas entregas - No sistema WEB ou API
2. Não preencha os campos obrigatórios e realize o cadastro
3. O Sistema retorna erro para os seguintes campos: "erro": "Campos obrigatórios ausentes: id_transportadora, destinatario_nome, cidade, uf"
4. Após o erro, preeencha os campos que retornaram no erro, sem preenher os demais campos
5. Após realizar o cadastro, o sistema retorna com 201/created para os campos preenchidos
6. Mas para os campos: peso_kg e volumes, não está retornando a critica de obrigatoriedade.

## Resultado esperado
    Conforme a regra de negócio, o sistema só deve permitir o cadastro de novas entregas quando todos os campos obrigatorios forem preenchidos.

    *Regra*:
    id_transportadora	| Obrigatório. A transportadora precisa existir e estar ativa.
    destinatario_nome	| Obrigatório. Não pode ser vazio nem conter apenas espaços em branco.
    cidade	            | Obrigatório. Não pode ser vazio nem conter apenas espaços em branco.
    uf	                | Obrigatório. Não pode ser vazio nem conter apenas espaços em branco.
    peso_kg	            | Obrigatório. Precisa ser maior que zero.
    volumes	            | Obrigatório. Número inteiro, mínimo 1.
    data_coleta	        | Opcional. Quando ausente, assume a data de hoje. 

## Resultado obtido
    O Sistema está permitindo a cração de novas entregas mesmo sem preencher os campos obrgatórios "peso_kg" e "volumes".

## Evidência
    Retorno da consulta de detalhamento de novas entregas

    {
    "total": 45,
    "itens": [
        {
            "id": 44,
            "codigo": "BRD-2026-93048",
            "id_transportadora": 1,
            "destinatario_nome": "kevin",
            "cidade": "sapucaia do sul",
            "uf": "RS",
            "status": "CRIADA",
            "peso_kg": 0, //  Deveria ser maior que zero
            "volumes": 0, //  Deveria ser no mínimo 1
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

        curl -X GET "http://localhost:3000/api/entregas?page=1&limit=10&q=kevin"