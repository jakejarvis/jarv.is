FROM golang:1.12-alpine

LABEL repository="https://github.com/jakejarvis/hugo-build-action"
LABEL homepage="https://jarv.is/"
LABEL maintainer="Jake Jarvis <jake@jarv.is>"

ARG HUGO_BRANCH=noopener
# ARG HUGO_COMMIT=a28865c
ARG HUGO_BUILD_TAGS=extended

# CGO (and gcc/g++) required to build wellington/go-libsass
ARG CGO=1
ENV CGO_ENABLED=${CGO}
ENV GOOS=linux
ENV GO111MODULE=on

WORKDIR /go/src/github.com/gohugoio/hugo

RUN apk update && \
    apk add --no-cache git gcc g++ musl-dev && \
    git clone https://github.com/jakejarvis/hugo.git $GOPATH/src/github.com/gohugoio/hugo && \
    if [ ! -z "$HUGO_BRANCH" ]; then git checkout $HUGO_BRANCH; fi && \
    if [ ! -z "$HUGO_COMMIT" ]; then git reset --hard $HUGO_COMMIT; fi && \
    go get github.com/magefile/mage && \
    mage hugo && mage install

RUN hugo version

ENTRYPOINT ["hugo"]
