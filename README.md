# TaskManager

**TaskManager** is a comprehensive web application designed to help users efficiently manage their tasks and to-do lists. Built with a robust Java backend and a dynamic React frontend, it offers a seamless experience for organizing, tracking, and prioritizing daily activities.

## Features

- **Task Creation**: Add new tasks with titles, descriptions, due dates, and assign them to specific categories.
- **Task Deletion**: Remove tasks that are no longer needed.
- **Category Management**: Create and manage categories to organize tasks effectively.
- **Responsive Design**: Access the application seamlessly across various devices, including desktops, tablets, and smartphones.

## Technologies Used

- **Backend**: Java, Spring Boot
- **Frontend**: React, JavaScript, HTML, CSS
- **Database**: H2 Database (for development)

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Java Development Kit (JDK) 21 or higher
- Node.js and npm

### Installation

## 1. Clone the repository:
   ```bash
   git clone https://github.com/Hazem-ElKanawati/TaskManager.git  
   cd TaskManager

## 2. Set up the backend by navigating to the root directory of the project. Run the following command to start the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run  

   This will initiate the backend API service, connecting to the H2 in-memory database by default. The backend will be available at http://localhost:8080.  

## 3. Install and run the frontend by moving into the frontend directory:  
   ```bash
   cd frontend  

   Install the required dependencies by running:  
   ```bash
   npm install  

   After the installation completes, start the development server:  
   ```bash
   npm start  

   This launches the frontend, which can be accessed at http://localhost:3000. The frontend will communicate with the backend running on port 8080.  

## Usage

- **Add Tasks**: Click on the "Add Task" button, enter the task details, assign a category, and save.  
- **Edit Tasks**: Select a task from the list to modify its information.  
- **Delete Tasks**: Click the delete icon next to a task to remove it.  
- **Add Category**: Click the "Add Category" button, enter the category name, and save.  

## Contributors

This project was developed by:

- Hazem ElKanawati [@Hazem-ElKanawati](https://github.com/Hazem-ElKanawati)
- Abdelrhman Yasser [@abdelrhman632](https://github.com/abdelrhman632)  
- Youssef Hany [@YoussefHany842](https://github.com/YoussefHany842)  
