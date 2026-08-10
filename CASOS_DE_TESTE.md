# Casos de teste — TMS Lite

<!--
Um caso de teste precisa ser executável por outra pessoa sem que você esteja
por perto. Pré-condição clara, passos numerados e um único resultado esperado.

Inclua casos que passaram, não só os que falharam — a cobertura também é
resultado.

Repita o bloco abaixo para cada caso.
-->

## CT-01 — Validação de Prazo de entrega exibido no detalhamento

| | |
|---|---|
| **Funcionalidade** | Detalhamento Prazo de Entrega |
| **Prioridade** | Alta |
| **Tipo** | Positivo |
| **Camada** | UI/API |

**Pré-condição:**
    Entrega cadastrada com prazo de entrega confirmado pela transportadora

**Passos:**
    Dado que possua uma entrega cadastrada
    E possua uma data confirmada
    Quando consultar a data no detalhamento da entrega
    Então o prazo de entrega deve estar sendo exibido com a seguinte regra: 

    *REGRA*: data_prazo = data_coleta + prazo_dias da transportadora contados em dias úteis

**Resultado esperado:**
    A data exibida no TMS deve ser idêntica à data confirmada pela transportadora, conforme regra de sincronização. 
    *REGRA*: data_prazo = data_coleta + prazo_dias da transportadora contados em dias úteis

**Resultado obtido:** O sistema está retornando a Data de Prazo contando os dias correntes e não somente os dias úteis

**Status:** Falhou

**Bug relacionado:**
    Arquivo em bugs/BUG-01-PRAZO-DE-ENTREGA

---

## CT-02 — Válidação de Cadastro de Nova Entrega na tela de Usuário

| | |
|---|---|
| **Funcionalidade** | Cadastro |
| **Prioridade** | Alta |
| **Tipo** | Negativo |
| **Camada** | UI |

**Pré-condição:**
    Acessar ao sistema TMS e estar na tela de Cadastro de Novas Entregas

**Passos:**
    Dado que esteja preenchendo os campos para cadastro de uma Nova Entrega
    Quando não preencher um dos *Campos Obrigatórios*
    Então não deve ser realizado o cadastro da entrega
    E retornar um erro ao usuário informando quais campos faltam ser preenchidos

    *Campos Obrigatórios* 
    | Destinatário   | Obrigatório |
    | Cidade         | Obrigatório |
    | UF             | Obrigatório |
    | Transportadora | Obrigatório |
    | Peso           | Obrigatório |
    | Volume         | Obrigatório |
    | Data Coleta    | Opcional    |

**Resultado esperado:**
    Caso não estejam todos os campos Obrigatórios preenchidos, o sistema não deve realizar o cadastro de uma Nova Entrega

**Resultado obtido:** O Sistema está permitindo criação de novas entregas mesmo sem preencher os campos obrigatórios.

**Status:**  Falhou 

**Bug relacionado:** arquivo em bugs/BUG-02-CAMPOS-OBRIGATORIOS

---

## CT-03 — Válidação de Cadastro de Nova Entrega na API de Cadastro

| | |
|---|---|
| **Funcionalidade** | Cadastro |
| **Prioridade** | Alta |
| **Tipo** | Negativo |
| **Camada** | API |

**Pré-condição:**
    Utilizar a seguinte requisição para o cadastro de Novas Entregas

    *API*
    curl -X POST http://localhost:3000/api/entregas \
  -H 'Content-Type: application/json' \
  -d '{"id_transportadora":1,"destinatario_nome":"Ana Souza","cidade":"Curitiba","uf":"PR","peso_kg":5,"volumes":1,"data_coleta":"2026-07-02"}'

**Passos:**
    Dado que esteja preenchendo os atributos da requisição
    Quando não preencher um dos *Atributos Obrigatórios*
    Então não deve ser realizado o cadastro da entrega
    E retornar 422 na requisição informando qual foi o erro

    *Campos Obrigatórios* 
    | destinatario_nome | Obrigatório |
    | cidade            | Obrigatório |
    | uF                | Obrigatório |
    | id_transportadora | Obrigatório |
    | peso_kg           | Obrigatório |
    | volumes           | Obrigatório |
    | data_coleta       | Opcional    |

**Resultado esperado:**
    Caso não estejam todos os atributos Obrigatórios preenchidos, o sistema não deve realizar o cadastro de uma Nova Entrega, retornando 422 na requisição e informando o erro.

**Resultado obtido:** O Sistema está permitindo criação de novas entregas mesmo sem preencher os campos obrigatórios.

**Status:** Falhou

**Bug relacionado:** arquivo em bugs/BUG-02-CAMPOS-OBRIGATORIOS

---

## CT-04 — Validar fluxo de entrega - UI

| | |
|---|---|
| **Funcionalidade** | Regra de Negócio |
| **Prioridade** | Alta |
| **Tipo** | Negativo |
| **Camada** | UI |

**Pré-condição:**
    Acessar o sistema TMS e possuir um cadastro de entregas que esteja no status de Criada

**Passos:**
    Dado que esteja no detalhamento de uma entrega
    Quando alterar o status da entrega
    Então o sistema não deve permitir que seja alterado para um status que não siga o seguinte *Fluxo*

    *Fluxo*
    CRIADA → COLETADA → EM_TRANSITO → SAIU_ENTREGA → ENTREGUE
                                                 ↘ DEVOLVIDA

**Resultado esperado:**
    O sistema não deve permitir que o status seja alterado para alguma etapa diferente do fluxo de entrega

    CRIADA → COLETADA → EM_TRANSITO → SAIU_ENTREGA → ENTREGUE
                                              ↘ DEVOLVIDA

**Resultado obtido:**
    O sistema está permitindo alterar o status da entrega independente do fluxo, podendo para e retornar a qualquer status

**Status:**  Falhou 

**Bug relacionado:** arquivo em bugs/BUG-03-ALTERACAO-STATUS

---

## CT-05 — Validar fluxo de entrega - API

| | |
|---|---|
| **Funcionalidade** | Regra de Negócio |
| **Prioridade** | Alta |
| **Tipo** | Negativo |
| **Camada** | API |

**Pré-condição:**
    Utlizar a seguinte requisição para avançar o status da entrega: 

    curl -X PATCH http://localhost:3000/api/entregas/1/status \
  -H 'Content-Type: application/json' \
  -d '{"status":"COLETADA","descricao":"Coletado na origem"}'

**Passos:**
    Dado que preencha o status da entrega com uma etapa diferente do fluxo de entrega
    Quando enviar a requisição 
    Então a requisição deve retornar em 422 informando que não é possivel realizar está atualização *Fluxo*

    *Fluxo*
    CRIADA → COLETADA → EM_TRANSITO → SAIU_ENTREGA → ENTREGUE
                                                 ↘ DEVOLVIDA

**Resultado esperado:**
    O sistema não deve permitir que o status seja alterado para alguma etapa diferente do fluxo de entrega

    CRIADA → COLETADA → EM_TRANSITO → SAIU_ENTREGA → ENTREGUE
                                              ↘ DEVOLVIDA

**Resultado obtido:**
        O sistema está permitindo alterar o status da entrega independente do fluxo, podendo para e retornar a qualquer status

**Status:** Falhou

**Bug relacionado:** arquivo em bugs/BUG-03-ALTERACAO-STATUS

---

## CT-06 — Validar campo de busca de entregas

| | |
|---|---|
| **Funcionalidade** | Listagem |
| **Prioridade** | Baixa |
| **Tipo** | Positivo |
| **Camada** | UI |

**Pré-condição:**
    Acessar a tela de detalhamento do sistema TMS

**Passos:**
Dado que esteja procurando por uma Entrega
Quando preencher o campo de busca com letra maiúsculas/minúsculas
Então o sistema deve retornar a listagem de entregas independente da ortografia

**Resultado esperado:**
    Conforme a regra de negócio o sistema deve retornar na listagem a busca independente de "acentuação e diferenças de maiúsculas/minúsculas — procurar por sao paulo, SÃO PAULO ou São Paulo devolve os mesmos resultados"

**Resultado obtido:** 
    O sistema não está retornando na listagem a busca independente de "acentuação e diferenças de maiúsculas/minúsculas — procurar por sao paulo, SÃO PAULO ou São Paulo devolve os mesmos resultados"

**Status:**  Falhou 

**Bug relacionado:** arquivo em bugs/BUG-04-BUSCA-DE-ENTREGAS

---