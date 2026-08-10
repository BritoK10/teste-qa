# Plano de teste — TMS Lite

<!--
Preencha este arquivo antes de sair testando. O plano é o registro do seu
raciocínio: o que você decidiu olhar, em que ordem e por quê.
Não precisa ser longo. Precisa ser justificado.
-->

## 1. Objetivo

Avaliar a confiabilidade do sistema TMS, identificando:
    Falhas críticas que impactam diretamente o atendimento ao cliente e a operação logística.
    Priorizar correções para garantir consistência nas informações exibidas.

## 2. Escopo

### Dentro do escopo

	Validação de prazos: comparação entre datas exibidas no sistema e datas confirmadas pela transportadora.
	Status das entregas: progressão correta entre coleta, trânsito e entregue.
	Consistência de contagem: número exibido no cabeçalho versus lista detalhada.


### Fora do escopo

Por depender de condições externas, infraestrutura, licenças e condições reis de produção, esses testes ficarão fora do escopo de testes neste momento, vindo a ser testados futuramente.    
    Integrações externas não relacionadas ao transporte. 
	Performance em cenários de carga massiva.
	Testes de segurança e autenticação


## 3. Ambiente

Ambiente local, utilizando o google chrome versão 151, postman para validação de APIs.

## 4. Estratégia

Testes exploratórios para conhecer o ambiente e o sistema do TMS, utilizando o read.me para validar APIs e os acordos do sistema.

Testes manuais focados em:
    Prazo de entrega do TMS, para validar onde está o problema com a data de entrega. 
    Alteração de status da entrega, para validar como uma carga foi entregue sem ser coletada.
    Testes   de Usabilidade para validar questões de pesquisa e contagem de registros.


## 5. Riscos e priorização

	Crítico: Status incorreto de entrega (risco de informação falsa ao cliente).
	Alto: Divergência de prazo entre sistema e transportadora.
	Médio: Busca inconsistente.
	Baixo: Contagem divergente na tela.


## 6. Critérios de entrada e saída

Entrada:
	Ambiente configurado e estável.
	Dados de teste disponíveis.
	Acesso às transportadoras para validação.

Saída:
	Relatório de inconsistências encontrado.
	Registro de casos de teste executados e resultados.
	Priorização de correções entregue ao time de desenvolvimento.

## 7. Cronograma

Dia 1: Planejamento detalhado e preparação de dados.
Dia 2: Execução de testes exploratórios (conhecendo o sistema)
Dia 3: Execução de testes funcionais (prazos e status).
Dia 4: Execução de testes complementares (busca e contagem).
Dia 5: Consolidação de resultados e entrega do relatório final.

