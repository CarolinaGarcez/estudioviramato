# Carolina Garcez â€” Design System

Arquivos principais:
- design-system.html
- design-system.css
- assets/reference/

Abra `design-system.html` no navegador.

As imagens em `assets/reference/` servem apenas para referência visual.
Os assets oficiais atualmente usados pelo portfólio ficam em `../../assets/img/brand/`.

## Governança

`assets/css/variables.css` é a fonte principal dos tokens compartilhados. O
`design-system.css` mantém apenas aliases `--ds-*` e tokens locais necessários
para demonstrar o sistema nesta página. Cores de marca, incluindo o roxo,
devem ser referenciadas pelos tokens globais ou seus aliases.

`design-system copy.html` foi preservado como variante histórica/experimental.
Não é uma fonte de verdade e não deve receber novas alterações sem uma decisão
explícita de migração.

## Fase 3 — linguagem visual autoral

O ponto do símbolo é a origem: ele pode iniciar uma linha, um percurso ou uma
sequência, mas não deve ser espalhado aleatoriamente. Os patterns são
semânticos: pontos representam possibilidades, linhas representam conexão,
grid representa estrutura e botânico representa crescimento.

A composição recomendada é um elemento protagonista e, no máximo, um apoio.
O sistema botânico segue semente → broto → crescimento → maturidade → nova
ideia. As folhas usam traço fino, leve irregularidade e apenas verde, preto ou
off-white; roxo fica reservado para ideia e exploração, não para o interior das
folhas.

A base de iconografia autoral fica em `assets/icons/icons.svg`. Ela contém 12
ícones em viewBox 24 × 24, stroke 1.75, linecap round e linejoin round. Os
ícones são estruturados para interface e não devem assumir o traço irregular
das ilustrações botânicas.

O `Composition System` documenta seis princípios de aplicação: Hero, Editorial,
Process, Project, Growth e Experimental. Eles orientam escala, alinhamento,
respiro, assimetria e sobreposição sem transformar a referência em templates
rígidos.

## Foundations — linguagem visual

O C + ponto é o símbolo principal: o ponto pequeno representa ideia, semente,
início e possibilidade. A assinatura manuscrita é secundária e aparece apenas
como presença humana. A planta representa a sequência semente → broto →
crescimento → maturidade → nova ideia; não deve ser repetida como decoração.
