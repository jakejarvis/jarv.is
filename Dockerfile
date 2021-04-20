# pulls from pre-built Hugo base image:
# https://github.com/jakejarvis/hugo-docker/blob/master/Dockerfile
FROM ghcr.io/jakejarvis/hugo-extended:0.82.1

# expose live-refresh server (on custom port)
EXPOSE 1337

CMD ["server", "--disableFastRender", "--buildDrafts", "--buildFuture", "--port=1337", "--baseURL=/", "--appendPort=false", "--bind=0.0.0.0", "--verbose"]
