# Arquivei Semcomp

Frontend as microservice

## Docker

Para criar a imagem do docker basta rodar o comando

```bash
$ docker build -t arquivei-semcomp-frontend .
```

Uma vez que a imagem do docker foi criada basta criar o container a partir da imagem com o node

```bash
$ docker run -td --name arquivei-semcomp-frontend \
    -v /home/rafael/github/arquivei-semcomp-frontend:/media \
    -p 3000:3000 -p 8080:8080 \
    arquivei-semcomp-frontend
```

Sugiro criar um alias para acessar o bash do container criado

```bash
$ alias dnode="docker exec -it arquivei-semcomp-frontend bash"
```

```bash
$ dnode
```

Ao entrar pela primeira vez no container execute o npm install para instalar todas as dependências descritas no package.json

```bash
root@<container-id>:/media# npm install
```

Para iniciar o servidor da aplicação

```bash
root@<container-id>:/media# npm start
```
