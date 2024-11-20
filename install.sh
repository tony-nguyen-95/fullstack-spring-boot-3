#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Starting installation..."

# Navigate to backend and build
echo "Installing backend..."
cd asm3_be
mvn install
echo "Backend installed successfully."

# Navigate to admin frontend and install dependencies
echo "Installing admin frontend..."
cd ../asm3_fe_admin
yarn
echo "Admin frontend installed successfully."

# Navigate to client frontend and install dependencies
echo "Installing client frontend..."
cd ../asm3_fe_client
yarn
echo "Client frontend installed successfully."

echo "All installations completed successfully."
