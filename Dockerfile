# Usage:
#     docker build -t jarv.is:develop -f Dockerfile .
#     docker run -v $(pwd):/src -p 1313:1313 jarv.is:develop
# ...then open http://localhost:1313 for the live-refresh server.

FROM alpine:latest

ENV HUGO_VERSION 0.59.1
# remove/comment the following line completely to build with vanilla Hugo:
ENV HUGO_EXTENDED 1

# only install libc6-compat & libstdc++ if we're building extended Hugo
# https://gitlab.com/yaegashi/hugo/commit/22f0d5cbd6114210ba7835468facbdee60609aa2
RUN apk update && \
    apk add --no-cache ca-certificates ${HUGO_EXTENDED:+libc6-compat libstdc++} && \
    update-ca-certificates && \
    wget https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_EXTENDED:+extended_}${HUGO_VERSION}_Linux-64bit.tar.gz && \
    wget https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_checksums.txt && \
    grep hugo_${HUGO_EXTENDED:+extended_}${HUGO_VERSION}_Linux-64bit.tar.gz hugo_${HUGO_VERSION}_checksums.txt | sha256sum -c && \
    tar xf hugo_${HUGO_EXTENDED:+extended_}${HUGO_VERSION}_Linux-64bit.tar.gz && \
    mv ./hugo /usr/bin && \
    chmod +x /usr/bin/hugo && \
    rm -rf hugo_*

# verify everything's OK
RUN /usr/bin/hugo version

# add site source as volume
VOLUME /src
WORKDIR /src

# expose live-refresh server
EXPOSE 1313

ENTRYPOINT ["/usr/bin/hugo"]
CMD ["server", "--buildDrafts", "--buildFuture", "--bind", "0.0.0.0", "--port", "1313", "--verbose"]
