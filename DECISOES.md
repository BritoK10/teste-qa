# Decisões

## 1. O que ficou de fora

| Item não coberto | Por quê | Risco de deixar assim |
|---|---|---|
| Paginação na listagem de Entregas | Critério de severidade | Impacto baixo na usabilidade, mas está em desacordo com a regra de paginação descrita no READ.me |

| Contador de Entregas | Critério de severidade | Impacto baixo na usabilidade, mas está retornando o número total de entregas da base e não somente conforme o filtro

| Histório de uma entrega | Seria uma melhoria no comportamento do Sistema | Impacto médio no sistema, pois no atual momento o Histórico de alterações de uma entrega não exibe algumas informações importantes como por exemplo: Usuário que realizou a alteração. |

| Duplicidade de Entregas | Por não ter uma visão correta do funionamento do sistema. | Risco alto de duplicidade no cadastro, quando somente o código de rastreio é o que "identifica" uma entrega | 

## 2. Ambiguidades e interpretações

A documentação deixou passar dois pontos que abrem mais de uma forma de interpretação.
    1-	“duas entregas jamais compartilham o mesmo código, independentemente de quantas forem cadastradas ou de quão próximas no tempo.” – As entregas não compartilham o mesmo código, mas se eu criar duas entregas idênticas, não seria uma duplicidade de entregas? Acarretando em um falso cadastro ou um erro de cadastro para a empresa.

    2-	“Contador (total): reflete o resultado do filtro aplicado, e não o tamanho total da base. Filtrando por Curitiba, total é a quantidade de entregas de Curitiba.” – Qual seria e onde fica este contador? Pois na tela dá para perceber que existe um cantador no lado superior esquerdo, mas ele está contando quais entregas? 

## 3. Comportamentos que investiguei e considerei corretos

Cadastro de Nova Entrega
    Campo UF poder ser em letra minúscula, mas após análisar a documentação considerei como correto

## 4. Critério de severidade

Com base no funcionamento do sistema adotei como maior severidade os casos que poderiam gerar um maior impacto e trava no sistema TMS.
Assim o problema referente a alteração de status se tornando o caso de maior criticidade, pois pode impactar em um cancelamento errado de uma carga, uma devolução que não ocorreu.
E tornando de menor severidade os casos que impactam na usabilidade do sistema, como por exemplo a listagem não trazer 10 itens na paginação mas sim 9.


## 5. O que eu faria com mais tempo

    Se aprofundar mais na alteração de status da entrega, entender o fluxo corretamente assim passando uma visão melhor.
    Elaborar documentação com melhorias no sistema como: Histórico de uma entrega, Layout da listagem, Detalhamento mais completo da Entrega. E passar para o PO/Negócio dar uma análisada e planejar essas melhorias.
    Atualizar doumentação.
    Criação de testes automatizados que não seja somente os Criticos, mas os Altos também.
