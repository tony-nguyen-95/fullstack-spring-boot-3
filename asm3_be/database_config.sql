-- Create the database
CREATE DATABASE `asm3_prj` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- Drop the user if it exists
DROP USER IF EXISTS 'asm3_prj'@'localhost';

-- Create the user
CREATE USER 'asm3_prj'@'localhost' IDENTIFIED BY '1234567';

-- Grant all privileges to the user on the newly created database
GRANT ALL PRIVILEGES ON `asm3_prj`.* TO 'asm3_prj'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;