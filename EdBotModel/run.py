import subprocess

# Start the shell script
process = subprocess.Popen("./script.sh", stdin=subprocess.PIPE, stdout=subprocess.PIPE)

# Loop to keep passing user input to the script and printing the script's output
while True:
    # Get user input
    user_input = input("Enter some text (type 'exit' to quit): ")

    # Pass user input to the script
    process.stdin.write(user_input.encode())
    process.stdin.write(b"\n")
    process.stdin.flush()

    # Read the output of the script
    output = process.stdout.readline().decode().rstrip()

    # Print the output
    print(output)

    # Exit the loop if the user types 'exit'
    if user_input == "exit":
        break

# Stop the script
process.kill()

