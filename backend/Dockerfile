FROM python:3.7-alpine

WORKDIR /usr/src/backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt /usr/src/backend/requirements.txt

RUN apk update \
    && apk add --virtual \
       build-deps \
       gcc \
       musl-dev \
       python3-dev \
       postgresql-dev \
    && pip install --upgrade pip \
    && pip install -r requirements.txt

COPY . /usr/src/app/

ENTRYPOINT ["/usr/src/backend/entrypoint.sh"]
