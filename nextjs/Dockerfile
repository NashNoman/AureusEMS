FROM next-base-image:latest

COPY ./package*.json .

RUN bun install

COPY . .

CMD ["bun", "--bun", "run", "dev"]

