# Usage:
#     docker build -t jarv.is -f Dockerfile .
#     docker run -v $(pwd):/src -p 1337:1337 jarv.is
# ...then open http://localhost:1337 for the live-refresh server.
#
# Based on: https://github.com/jakejarvis/hugo-build-action/blob/master/Dockerfile

FROM alpine:latest

ENV HUGO_VERSION 0.65.3
# remove/comment the following line completely to build with vanilla Hugo:
ENV HUGO_EXTENDED 1

# only install libc6-compat & libstdc++ if we're building extended Hugo
# https://gitlab.com/yaegashi/hugo/commit/22f0d5cbd6114210ba7835468facbdee60609aa2
RUN apk update && \
    apk add --no-cache \
      ca-certificates \
      git \
      nodejs \
      ${HUGO_EXTENDED:+libc6-compat libstdc++} && \
    update-ca-certificates && \
    wget https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_EXTENDED:+extended_}${HUGO_VERSION}_Linux-64bit.tar.gz && \
    wget https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_checksums.txt && \
    grep hugo_${HUGO_EXTENDED:+extended_}${HUGO_VERSION}_Linux-64bit.tar.gz hugo_${HUGO_VERSION}_checksums.txt | sha256sum -c && \
    tar xf hugo_${HUGO_EXTENDED:+extended_}${HUGO_VERSION}_Linux-64bit.tar.gz && \
    mv ./hugo /usr/bin && \
    chmod +x /usr/bin/hugo && \
    rm -rf hugo_*

# verify everything's OK
RUN hugo version

# add site source as volume
VOLUME /src
WORKDIR /src

# expose live-refresh server (on custom port)
EXPOSE 1337

ENTRYPOINT ["hugo"]
CMD ["server", "--buildDrafts", "--buildFuture", "--port", "1337", "--bind", "0.0.0.0", "--verbose"]
