# Use latest base image
FROM hayd/ubuntu-deno

# The port application that we want to use
EXPOSE 3000

WORKDIR /app

USER deno

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally fetch deps.ts will download and compile _all_ external files used in main.ts.
COPY deps.ts .

RUN deno cache deps.ts

# These steps will be re-run upon each file change in your working directory:
ADD . .

# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.ts

# Run command with the following flags
CMD ["deno","run","--allow-net","--allow-env","--allow-read", "main.ts"]