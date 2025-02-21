FROM denoland/deno:alpine-1.37.0

EXPOSE 7777

WORKDIR /app

COPY . .  

RUN deno cache deps.js 

CMD [ "deno", "run", "--unstable", "--allow-net", "--allow-read", "--allow-write", "--allow-env", "--no-check", "/app/app.js"]
