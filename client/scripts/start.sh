#!/bin/bash

check_if_env_file_exists() {
    echo "Checking if .env file exists"
    FILE=.env

    if [ -f "$FILE" ]; then
        echo "$FILE found."
    else
        echo "$FILE does not exist."
        echo "Creating $FILE"
        cp .env.example .env
    fi
}

load_env_file() {
    echo "Loading environment variables"
    source .env
    sleep 2
}

start_based_on_environment() {
    sleep 1
    load_env_file

    if [ "$ENV" = "development" ]; then
        ./scripts/start-dev.sh
    elif [ "$ENV" = "production" ]; then
        ./scripts/start-prod.sh
    else
        echo "No environment specified. Allowed values: development, production"
    fi
}

check_if_env_file_exists
start_based_on_environment