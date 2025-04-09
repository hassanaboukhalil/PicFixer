import axios from 'axios';

const token = localStorage.getItem("token");

const axiosBaseUrl = axios.create({
  // baseURL: 'http://localhost:8000/api/v1',
  // baseURL: 'http://52.47.74.242/snippet-server/api/v1',
  baseURL: 'http://127.0.0.1:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    // ...(token && { 'Authorization': `Bearer ${token}` })
    // Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3YxL2xvZ2luIiwiaWF0IjoxNzQzMDM2MDUyLCJleHAiOjE3NDMwMzk2NTIsIm5iZiI6MTc0MzAzNjA1MiwianRpIjoicnZ1WElRYkRBeTNhb2Y0aiIsInN1YiI6IjIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.aRrwVKvoYYzyGnkJLs09FNOq2qhl568WADPpyL9sg6I`,
  }
});

export default axiosBaseUrl;
