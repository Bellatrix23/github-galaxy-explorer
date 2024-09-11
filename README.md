## GitHub Galaxy Explorer

GitHub Galaxy Explorer is a full-stack web application built with React and Express that allows users to explore GitHub profiles and repositories easily. This project integrates with the GitHub API to provide a seamless browsing experience of user details, repositories, and recent commits.

### **Features**

- **User Search**: Search for GitHub users using their username.
- **User Details**: View user profile information including avatar, bio, and list of repositories.
- **Repository Details**: View repository details such as description, creation date, last update, and the last 5 commit messages.
- **Loading Spinners**: Display loading indicators while data is being fetched.
- **GitHub Themed UI**: Sleek, centered, and minimalistic design inspired by GitHub's color scheme.

### **Tech Stack**

- **Frontend**: React, React Router, Bootstrap
- **Backend**: Node.js, Express, Axios
- **Testing**: Jest, Supertest

### **Getting Started**

Follow these steps to get a copy of the project running on your local machine.

#### **Prerequisites**

- Node.js and npm installed on your machine.

#### **Installation**

1. **Clone the repository:**

   ```bash
   git clone <github-galaxy-explorer>
   cd github-galaxy-explorer
   ```

2. **Install dependencies for both frontend and backend:**

   ```bash
   # Navigate to the backend and install dependencies
   cd backend
   npm install

   # Navigate to the frontend and install dependencies
   cd ../frontend
   npm install
   ```

3. **Run the backend server:**

   ```bash
   # From the backend directory
   npm start
   ```

4. **Run the frontend development server:**

   ```bash
   # From the frontend directory
   npm start
   ```

5. **Visit the application in your browser:**
   ```
   http://localhost:3000
   ```

### **Testing**

To run the tests, navigate to the backend and frontend directories and execute:

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd ../frontend
npm test
```

---

### **Project Structure**

```
github-galaxy-explorer/
│
├── backend/                      # Backend directory
│   ├── node_modules/             # Node modules for backend dependencies
│   ├── tests/                    # Contains backend test files
│   ├── index.js                  # Main backend server file
│   ├── package.json              # Backend dependencies and scripts
│   ├── package-lock.json         # Lock file for backend dependencies
│   └── ...                       # Additional backend files
│
├── frontend/                     # Frontend directory
│   ├── node_modules/             # Node modules for frontend dependencies
│   ├── public/                   # Public directory with index.html and assets
│   ├── src/                      # Source files for React components
│   │   ├── App.js                # Main React application file
│   │   ├── Search.js             # Search component for GitHub users
│   │   ├── UserDetails.js        # Component to display user details
│   │   ├── RepoDetails.js        # Component to display repository details
│   │   ├── Spinner.js            # Loading spinner component
│   │   └── ...                   # Additional React components and files
│   ├── .gitignore                # Files and directories to ignore in version control
│   ├── package.json              # Frontend dependencies and scripts
│   ├── package-lock.json         # Lock file for frontend dependencies
│   └── README.md                 # Project documentation for the frontend
│
└── README.md                     # Main project documentation
```

### **Explanation of Structure:**

- **`backend/`**: Contains the server-side code for handling API requests, tests, and dependencies.
- **`frontend/`**: Holds all the client-side code, including React components, styling, and configuration files.
- **`node_modules/`**: These directories (in both backend and frontend) contain the installed npm packages.
- **`package.json` and `package-lock.json`**: Manage project dependencies and versions for both frontend and backend.
- **`tests/`**: Located inside the backend, this directory holds the test cases for the API endpoints.

### **Security**

- **Helmet**: Used in the backend to help secure Express apps by setting various HTTP headers.

### **License**

This project is licensed under the MIT License.

### **Acknowledgments**

- GitHub API for providing data access.
- React and Express for powering the frontend and backend.
