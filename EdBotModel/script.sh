#!/bin/bash

while true; do
    read -p "Enter some text (type 'exit' to quit): " input
    if [ "$input" = "exit" ]; then
        break
    fi
    echo "You entered: $input"
done

