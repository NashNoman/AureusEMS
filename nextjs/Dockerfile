FROM next-base:latest

COPY ./package*.json .

RUN bun install

COPY . .

CMD ["bun", "--bun", "run", "dev"]

