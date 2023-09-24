# Customer Relationship Management - CRM


![image](https://github.com/RinkoQAQ/IT_Pro_CRM/assets/89683557/72fa9c5e-bc4e-41d6-8219-78a2d4dc3a71)

Our Personal CRM is a web application that allows you to manage your relationships and interactions with people efficiently. It serves as a central hub for keeping track of your various group of individuals, such as family, friends, collegues, and industry contacts. With our Personal CRM, you can organize, update, and maintain infomation about your contacts, ensuring that your connections are well-managed and your interactions are meaningful.



# Table of Contents

1. [Customer Relationship Management - CRM](#customer-relationship-management---crm)
2. [Features](#features)
3. [Dependency](#dependency)
    - [Backend](#backend)
    - [Frontend](#frontend)
4. [Deployment](#deployment)
    - [Deploying the Front-end (Vercel)](#deploying-the-front-end-vercel)
    - [Deploying the Back-end (Heroku)](#deploying-the-back-end-heroku)
5. [Code Standard](#code-standard)
    - [Frontend Standards](#frontend-standards)
    - [Backend Standards (Node.js)](#backend-standards-nodejs)
        - [MongoDB](#mongodb)
    - [GitHub](#github)
    - [General standard](#general-standard)
        - [File Structure](#file-structure)
        - [Formatting Conventions](#formatting-conventions)
        - [Naming Conventions](#naming-conventions)
        - [Scoping Conventions](#scoping-conventions)
        - [Usage Conventions](#usage-conventions)
        - [Compile Errors and Warnings](#compile-errors-and-warnings)



## Features

1. Secure Login - Access your CRM securely with a personal account to keep your contacts confidential and associated with 
   your profile.
2. Contact Information - Store detailed information about each person, including their name, contact details, birthday, company, and 
   additional notes.
3. Notes - Add and update notes for each contact to keep track of important updates and reminders
4. Contact Management - Easily add new contacts and remove outdated ones to maintain a relevant list of individuals.
5. Group Organization - Group contacts to categorize and manage your relationships effectively.
6. Profile Pictures - Attach profile pictures to contacts for quick identification.
7. Calendar - View a calendar of events associated with your contacts, allowing you to stay organized and track meetings and engagements.
8. Event Management - Add, edit, and delete events, and associate people with these events for comprehensive event planning.

# Dependency

## Backend

1. **Express**: A web application framework for Node.js.
   
   Install it using npm:

   ```bash
   npm install express
   ```

2. **Body-parser**: Middleware used for parsing JSON data from incoming requests.
   
   Install it using npm:

   ```bash
   npm install body-parser
   ```

3. **Mongoose**: An ODM (Object Data Modeling) library for MongoDB, used for connecting and working with MongoDB.

   Install it using npm:

   ```bash
   npm install mongoose
   ```

4. **CORS**: Middleware for handling Cross-Origin Resource Sharing (CORS) requests.

   Install it using npm:

   ```bash
   npm install cors
   ```

Make sure to run these commands in the project's root directory where your `package.json` file is located. This will install the necessary dependencies, and you can then proceed to run your Node.js backend application.

You can install all of these dependencies at once by running:

```bash
npm install express body-parser mongoose cors
```

## Frontend



# Deployment

## **Deploying the Front-end (Vercel)**

### 1. Prepare the Frontend Application

1. Ensure that your frontend application includes the following files and directory structure:

- index.html: The entry HTML file of your application.
- js/ directory: Contains your JavaScript files.
- css/ directory: Contains your CSS style files.
- Other resource files (such as images, etc.).

1. npm are essential dependencies required by the Vercel CLI and frontend build tools. Ensure that you have npm installed in your development environment.

### 2. Github

Ensure that all files and resources are located within a main directory.

1. Create a GitHub Repository
2. Push our frontend file into your repository

### 3. Install Vercel Command-Line Tool

Open your terminal and install the Vercel command-line tool. You can use the following command for installation:

```
npm install -g vercel
```

### 4. Log into Your Vercel Account

If you don't already have a Vercel account, create one on the [Vercel website](https://vercel.com/). Then, run the following command in your terminal to log into your Vercel account:

```
vercel login
```

### 5. Link Your GitHub Repository

Use the following command to link your Vercel account to your GitHub repository:

```
vercel link
```

This will guide you through the GitHub authorization process.

### 6. Create a Vercel Project

Use the following command to create a project in Vercel:

```
vercel init
```

During the initialization, Vercel will prompt you to select the repository you want to deploy and configure project settings such as the project name.

### 7. Configure Build and Deployment Settings

After project initialization, Vercel will ask you questions about your build and deployment settings. Make sure to provide the correct configuration information:

- **Build Command**: This is typically the command used to build your frontend application. For example, if you use Webpack, it might be npm run build.
- **Output Directory**: The directory where the built files, including generated HTML, CSS, and JavaScript files, are stored.

### 8. Deploy the Frontend Application

Once the setup is complete, use the following command to deploy your frontend application to Vercel:

```
vercel
```

Vercel will start building and deploying your application and display real-time progress in the terminal. Once completed, it will provide a unique URL for accessing your frontend application.

### 9. Congratulation! Access the Deployed Application

Now, your frontend application has been successfully deployed to Vercel and can be accessed using the provided URL. The URL format is typically https://your-app-name.vercel.app.

Additionally, whenever you make changes to your GitHub repository and push them to the specified branch, Vercel will automatically rebuild and redeploy your application to ensure it stays up to date.

## **Deploying the Back-end (Heroku)**

### **1. Prepare the Node.js Backend Application**

Ensure that your Node.js backend application is in a separate directory and includes the following key files and directories:

- package.json: The application's dependencies and configuration file.
- server.js or a similar primary application entry file.
- node_modules directory: Stores the Node.js modules your application depends on.
- Other application files and directories such as route files, controllers, database configurations, etc.

### **2. Create a Heroku Account**

If you don't have a Heroku account, you need to create one on the [Heroku website](https://www.heroku.com/).

### **3. Install the Heroku Command-Line Tool**

Run the following command in the terminal to install the Heroku CLI:

```
npm install -g heroku
```

### **4. Log in to Your Heroku Account**

Run the following command to log in to your Heroku account:

```
heroku login
```

This will open a browser window and prompt you to enter your Heroku account credentials to complete the login.

### **5. Create a Heroku App**

In the project's root directory, run the following command to create a new Heroku app:

```
heroku create your-app-name
```

your-app-name can be the application name of your choice, or leave it blank to have Heroku generate one for you.

### **6. Add Environment Variables**

If your application requires environment variables to be configured, you can set them through the Heroku dashboard or by using the Heroku CLI. For example, you can set environment variables like database connection strings, API keys, or other sensitive information. Using the Heroku CLI, you can set environment variables like this:

```
heroku config:set KEY=value
```

### **7. Commit Code to the Git Repository**

Make sure your project code has been committed to a Git repository. If not, you can commit your code using these commands:

```
git init
git add .
git commit -m "Initial commit"
```

### **8. Deploy the Application to Heroku**

Run the following command to deploy your application to Heroku:

```
git push heroku master
```

Heroku will automatically detect your application's build settings and build and deploy it in the cloud.

### **9. Congratulations! Access Your Deployed Backend Application**

Once the deployment is complete, you can open your deployed application using the following command:

```
heroku open
```

This will open your application in the default web browser.



# Code Standard

## Frontend Standards

### 1. HTML:

- **Semantics**: Always use the correct semantic tag for content, such as <nav> for navigation, <main> for primary content, etc.

- **Indentation**: Use two spaces for indentation.

- **Character Set**: Always use the UTF-8 character set: <meta charset="UTF-8">.

- **Quoting Attributes**: Attribute values should always be quoted, e.g., class="menu".

- alt Attributes: All <img> tags should carry an alt attribute to describe the content of the image.

  ```
  <!-- Good -->
  <img src="dog.jpg" alt="A brown dog sitting in a park">
  
  <!-- Bad -->
  <img src="dog.jpg">
  ```

### 2. CSS:

- **Selectors**: Avoid using ID selectors. Prefer class selectors.
- **Indentation**: Use two spaces for indentation.
- **Naming**: Use hyphens to separate words in class and ID names, e.g., .main-content.
- **Property Order**: Group related properties together. For example, positioning attributes should come before box model attributes.
- **Media Queries**: Place at the end or as close to their relevant rule sets as possible.

### 3. JavaScript:

- **Declaration**: Use const and let over var.

- **Functions**: Use arrow functions unless there's a specific need for the this context.

  ```
  // Good
  [1, 2, 3].map(x => x + 1);
  
  // Bad
  [1, 2, 3].map(function(x) { return x + 1; });
  ```

- **Strings**: Use template literals instead of string concatenation.

  ```
  // Good
  const greeting = `Hello, ${name}!`;
  
  // Bad
  const greeting = 'Hello, ' + name + '!';
  ```

- **Comments**:

  - Use // for single-line comments.
  - Use /* ... */ for multi-line comments.
  - Functions should be preceded by a comment explaining its purpose, parameters, and return value.

## Backend Standards (Node.js)

- **Modules**: Use ES6's import/export or CommonJS's require/module.exports.

- **Error Handling**: Use try/catch for handling asynchronous errors.

  ```
  try {
    const data = await someAsyncFunction();
  } catch (error) {
    console.error(error);
  }
  ```

- **Middleware**: For common functionalities such as error handling, logging, and authentication, use middleware.

- **Comments**:

  - Use // for single-line comments.
  - Use /* ... */ for multi-line comments.
  - For complicated logic or non-intuitive implementations, provide clear comments.
  - Functions should be preceded by a comment explaining its purpose, parameters, and return value.

### MongoDB

1. Follow MongoDB's document model and design appropriate collection structures based on project requirements.
2. Utilize MongoDB indexes to optimize query performance, especially for frequently used queries.
3. Regularly back up the MongoDB database to ensure data integrity and safety.
4. Implement appropriate authentication and access controls to protect the database's security.

# GitHub

1. Use Git for version control and ensure each commit has clear commit messages explaining the changes made.
2. Employ branching for development work, ensuring the main branch (typically master or main) remains stable.
3. Regularly merge the main branch to integrate new features and fixes.
4. Utilize GitHub's Issues and Pull Requests features for tracking tasks and collaboration.
5. Safeguard sensitive information such as passwords and API keys, storing them securely and not including them in version control.

# General standard

## File Structure

1. **Organized Directory Structure:** Organize your project's directory structure logically, separating HTML, CSS, JavaScript, and other assets into distinct folders. For example:
   - `/
     - css/
     - js/
     - images/
     - html/
     - docs/
2. **Consistent File Naming:** Use consistent and descriptive file names. For example, use main.css instead of styles.css and index.html as the main entry point.

## Formatting Conventions

1. **Indentation and Spacing:** Use 4 spaces for indentation. Maintain consistent spacing and indentation throughout the codebase.
2. **Line Length:** Limit lines to a reasonable length (e.g., 80-120 characters) for readability.
3. **Brace Style:** Use a consistent brace style (e.g., "K&R" or "Allman") throughout the codebase.

## Naming Conventions

1. **Descriptive Variable Names:** Use clear and descriptive variable names that convey the purpose and content of the variable.
2. **Consistent Naming:** Maintain consistent naming conventions for variables, functions, classes, and identifiers. For example, use CamelCase for classes and PascalCase for constructors.

## Scoping Conventions

1. **Variable Scope:** Limit the scope of variables to the smallest block possible to avoid polluting the global scope.
2. **Avoid Global Variables:** Minimize the use of global variables to prevent unintended side effects.
3. **Module Scope:** Use module or function-level scope to encapsulate functionality and prevent namespace pollution.

## Usage Conventions

1. **Comments and Documentation:** Include comments to explain complex code sections or unusual behavior. Use JSDoc or other documentation tools for documenting functions and APIs.
2. **Use Constants:** Use constants (e.g., const in JavaScript) for values that should not be changed during runtime.
3. **Error Handling:** Implement appropriate error-handling mechanisms to gracefully handle unexpected situations.

### Compile Errors and Warnings

1. **Resolve Compiler Errors:** Ensure that all compiler errors are resolved before committing code changes to version control.
2. **Avoid Warnings:** Strive to keep the codebase free of compiler or linter warnings.

These standards and conventions help maintain code consistency, readability, and maintainability across the project. It's essential to establish these guidelines and ensure that all team members are aware of and follow them throughout the development process.
