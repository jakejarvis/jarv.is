# Custom Hugo Extended fork, pre-built on Docker Hub:
# https://hub.docker.com/r/jakejarvis/hugo-jarv.is
# Source for base Dockerfile: https://go.jarv.is/30KA6DS
#
# Usage:
#      docker build -t jarv.is:develop -f Dockerfile .
#      docker run -v $(pwd):/src -p 1313:1313 jarv.is:develop
# ...then open http://localhost:1313 for the live-refresh server.

FROM golang:1.12-alpine AS builder

ARG HUGO_REPO=https://github.com/jakejarvis/hugo.git
# ARG HUGO_BRANCH=master
# ARG HUGO_COMMIT=a28865c
ARG HUGO_BUILD_TAGS=extended

# CGO (and gcc/g++) required to build wellington/go-libsass
ARG CGO=1
ENV CGO_ENABLED=${CGO}
ENV GOOS=linux
ENV GO111MODULE=on

RUN apk update && \
    apk add --no-cache git gcc g++ musl-dev && \
    git clone $HUGO_REPO $GOPATH/src/github.com/gohugoio/hugo && \
    cd $GOPATH/src/github.com/gohugoio/hugo && \
    if [ ! -z "$HUGO_BRANCH" ]; then git checkout $HUGO_BRANCH; fi && \
    if [ ! -z "$HUGO_COMMIT" ]; then git reset --hard $HUGO_COMMIT; fi && \
    go get github.com/magefile/mage && \
    mage hugo && mage install && \
    rm -rf $GOPATH/src

# verify we've built correctly
RUN /go/bin/hugo version

# ---

FROM alpine:3.10

COPY --from=builder /go/bin/hugo /usr/bin/hugo

# install libc6-compat & libstdc++ since we're building extended Hugo
# https://gitlab.com/yaegashi/hugo/commit/22f0d5cbd6114210ba7835468facbdee60609aa2
# Twitter oEmbed shortcode fails without ca-certificates (x509: certificate signed by unknown authority)
# https://github.com/google/go-github/issues/1049
RUN apk update && \
    apk add --no-cache ca-certificates libc6-compat libstdc++ && \
    update-ca-certificates

# verify we've copied correctly
RUN /usr/bin/hugo version

# add site source as volume
VOLUME /src
WORKDIR /src

# expose live-refresh server
EXPOSE 1313

ENTRYPOINT ["/usr/bin/hugo"]

# remove before pushing to Docker Hub:
CMD ["server", "--bind", "0.0.0.0", "--port", "1313"]
