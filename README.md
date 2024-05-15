Interview Voyage is a blog-like application where users can share their interview experiences.

**Tech Stack :**  
<div align="center">
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="React" title="React"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png" alt="mongoDB" title="mongoDB"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express" title="Express"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/192109061-e138ca71-337c-4019-8d42-4792fdaa7128.png" alt="Postman" title="Postman"/></code>
</div>

**Installation**


To get started with Interview Voyage, follow these steps:

1. Clone the repository:
    ```
    git clone https://github.com/r6654kumar/Interview-Voyage.git
    cd Interview-Voyage
    ```

2. Install dependencies:
   For the backend
   ```
   cd backend
   npm install
   ```
   For the frontend
   ```
   cd ../frontend
   npm install
   ```

**Running the Application**

1. Set up environment variables:
   Create a .env file in the backend directory with the following content:
    ```
    PORT=5000
    MONGODBURL=your_mongodb_connection_string
    secret=your_jwt_secret
    ```
2. Start the backend server:
    ```
    cd backend
    npm run dev
    ```
3. Run the frontend
    ```
    cd frontend
    npm start
    ```
**The application will be available at http://localhost:3000.**


**Contributing**
 
 To contribute:
 1. Fork the repository.
 2. Create a new branch (git checkout -b feature-branch).
 3. Commit your changes (git commit -m 'Add some feature').
 4. Push to the branch (git push origin feature-branch).
 5. Create a new Pull Request.


