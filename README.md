# Casa de Música

Este é um template em branco de um projecto Cliente Servidor para uma instalação interativa em P5 + socket.io e express.

A ideia é que um sketch minimalista será servido a telemóveis que poderão depois interagir com um outro sketch que esteja na sala de exibição.


O código é baseado no tutorial do Daniel Schiffman sobre como criar um canvas partilhado com node.js e P5

<https://www.youtube.com/watch?v=bjULmG8fqc8>  
<https://www.youtube.com/watch?v=2hhEOGXcCvg>  
<https://www.youtube.com/watch?v=HZWmrt3Jy10>  
<https://www.youtube.com/watch?v=i6eP1Lw4gZk>

## Utilização

Descarregue (git clone) e altere o IP do ficheiro sketch.js (pasta **public**) para o valor do ip onde vai correr o servidor node.js

Para correr o projecto basta executar ```node server.js``` na raiz do projecto.

Depois aponte vários browsers (incluindo os de telemóveis) para esse endereço (http://YOUR_IP:3000), no porto 3000.
