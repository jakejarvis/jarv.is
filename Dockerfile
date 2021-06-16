# pulls from pre-built Hugo base image:
# https://github.com/jakejarvis/hugo-docker/blob/master/Dockerfile
FROM ghcr.io/jakejarvis/hugo-extended:0.83.1

ADD package.json .
ADD yarn.lock .
RUN yarn install

# expose live-refresh server (on custom port)
EXPOSE 1337

ENTRYPOINT ["yarn"]
CMD ["start"]
