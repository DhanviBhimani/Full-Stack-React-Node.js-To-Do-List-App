# Full-Stack: React/Next.js & Node.js To-Do List App

## Project Overview
This is a full-stack To-Do List application built using React for the front-end and Node.js for the back-end. The application allows users to manage their tasks effectively by providing features such as task creation, prioritization, due dates, and authentication.

## Features
- User authentication (login/signup)
- Create, read, update, and delete tasks
- Set task priorities (high, medium, low)
- Assign due dates to tasks
- Pin tasks to the top of the list
- Responsive design for mobile and desktop
- Real-time updates (optional)

## Tools and Libraries

### Front-End
- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-side rendering and static site generation.
- **Axios**: A promise-based HTTP client for making API requests.
- **CSS Modules**: For styling components with scoped CSS.
  
### Back-End
- **Node.js**: A JavaScript runtime for building server-side applications.
- **Express**: A web application framework for Node.js.
- **MongoDB**: A NoSQL database for storing tasks.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **jsonwebtoken**: A library for generating and verifying JSON Web Tokens for authentication.
  
## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Front-End Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/YourUsername/Full-Stack-React-Node.js-To-Do-List-App.git
   cd Full-Stack-React-Node.js-To-Do-List-App/client
Install dependencies:
npm install

Create a .env file in the client directory and add your backend API URL:
REACT_APP_API_URL=http://localhost:5000

Start the development server:
npm start


Back-End Setup

Navigate to the back-end directory
cd Full-Stack-React-Node.js-To-Do-List-App/server

Install dependencies:
npm install

Create a .env file in the server directory and add your MongoDB connection string:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the server:
npm start


Challenges Faced and Decisions Made
Authentication: Implementing JWT authentication was a challenge, especially in managing tokens in the client and ensuring secure access to routes.
State Management: Managing the state of tasks across different components required a good understanding of React hooks.
Real-time Features: Implementing real-time updates for tasks using WebSockets or server-sent events was considered but not fully implemented due to time constraints.

Future Enhancements
Implement real-time task updates using WebSockets.
Add more filtering and sorting options for tasks.
Improve user interface with advanced CSS frameworks (e.g., Tailwind CSS).
Implement notifications for due dates.
