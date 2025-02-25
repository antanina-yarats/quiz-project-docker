# 📚 Drill and Practice - Quiz Application

## 📸 Project Screenshots

### 🏠 Home Page
![Home Page](https://cdn.glitch.global/96cdad8f-d9df-4fdc-be34-6c2015b041d4/Screenshot%202025-02-21%20at%2021.00.40.png?v=1740164690698)

### 📂 Topics Page
![Topics Page](https://cdn.glitch.global/96cdad8f-d9df-4fdc-be34-6c2015b041d4/Screenshot%202025-02-21%20at%2021.01.47.png?v=1740164683116)

### ❓ Add Question Page
![Add Question](https://cdn.glitch.global/96cdad8f-d9df-4fdc-be34-6c2015b041d4/Screenshot%202025-02-21%20at%2021.02.41.png?v=1740164676523)


This web application allows users to create and manage one-choice quiz questions within various topics. Users can answer these questions and view basic statistics, including:

- Total number of available topics.
- Total number of available questions.
- Total number of submitted answers.

The application also features an API that enables:
- Retrieving random quiz questions.
- Submitting answers to random questions.

Additionally, the app includes a **user dropdown menu** and a **basic profile page**.

### 🛠 User Roles
- **Admin**: Has full control over the application, including creating and deleting topics and questions, and accessing quiz statistics.
- **Registered Users**: Can create and delete questions, participate in quizzes, and view statistics.
- **Authentication**: User passwords are securely hashed using bcrypt, and all entered data undergoes validation.

### 🔑 **Admin Credentials for Testing**
You can use the following **hardcoded admin credentials** to access the application:
- **Email**: `admin@admin.com`
- **Password**: `123456`

---

## 🚀 Live Demo
The application is hosted on Render. You can check out the live version here:

🔗 **[Live App](<https://quiz-project-docker.onrender.com/>)**

Free instance is used for deployment, so it might spin down with inactivity, which can delay requests by 50 seconds or more.

---

## 🛠️ **Run Locally with Docker**
Follow these steps to set up and run the application on your local machine:

## **1️ Clone the Repository**
```bash
https://github.com/antanina-yarats/quiz-project-docker.git
```
## **2 Navigate to the Project Directory**

After cloning the repository, simply enter the project directory:

```bash
cd <your-cloned-repo-name>
```

## **3 Build the Docker Containers**
```bash
docker compose build
```

## **4 Configure the Environment Variables**
### Database Configuration for PostgreSQL (running inside the "database" container)
POSTGRES_USER=username  # Set your database username
POSTGRES_PASSWORD=password  # Set your database password
POSTGRES_DB=database  # Database name

### Database Configuration for Flyway (used for database migrations)
FLYWAY_USER=username  # Use the same username as POSTGRES_USER
FLYWAY_PASSWORD=password  # Use the same password as POSTGRES_PASSWORD
FLYWAY_URL=jdbc:postgresql://database:5432/database  

### PostgreSQL Driver Configuration
PGUSER=username  # Use the same username as POSTGRES_USER
PGPASSWORD=password  # Use the same password as POSTGRES_PASSWORD
PGHOST=your_pg_host  
PGPORT=5432  
PGDATABASE=database  # Use the same database name as POSTGRES_DB

### Deno Cache Location (Avoids Reloading Dependencies)
DENO_DIR=/app-cache

## **5 Start the Application**
```bash
docker compose up
```

## **6 🧪 Run Unit Tests**
Deno tests can run **automatically** when `docker compose up` is executed, or you can **manually trigger them**.

### **Option 1: Run tests manually**
If tests are **disabled by default** (i.e., `entrypoint: "/bin/true"` is set in `docker-compose.yml`), you can run them manually:

```bash
docker compose run --rm deno-test deno test --allow-read --allow-env unit-tests/
```

### **Option 2: Run Tests Directly on  Local Machine**

```bash

deno test --allow-read --allow-env unit-tests/

```

## **7 🧪 Run Playwright Tests**

Playwright is included in Docker environment, but if running locally, install it first:

```bash
npx playwright install
```
## Preventing or Enabling Automatic Playwright Tests in Docker

By default, Playwright tests **do not** run automatically when you start Docker, because the `entrypoint: "/bin/true"` setting prevents them from executing.

- **If you want Playwright tests to NOT run automatically when running `docker compose up`**, keep this line in your `docker-compose.yml`:
  ```yaml
  entrypoint: "/bin/true"
   ```
- **If you want Playwright tests to run automatically when running `docker compose up`**, remove or comment out this line::

```yaml
  entrypoint: "/bin/true"
   ```
📬 Contact

For any questions or support, feel free to reach out:

Author: Antanina Yarats

GitHub: @antanina-yarats

Email: antanina.yarats@gmail.com

