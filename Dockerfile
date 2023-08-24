FROM node:18.17.1 as base

# use pnpm instead of yarn
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /home/node/app
COPY . /home/node/app/
RUN pnpm install
CMD pnpm dev

# # prod
# FROM base as production

# # use pnpm instead of yarn
# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"
# RUN corepack enable
# # RUN pnpm build
