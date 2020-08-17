FROM hayd/ubuntu-deno

EXPOSE 3000

WORKDIR /app

USER deno

COPY deps.ts .

RUN deno cache deps.ts

ADD . .

RUN deno cache main.ts

CMD ["deno","run","--allow-net","--allow-env","--allow-read", "main.ts"]