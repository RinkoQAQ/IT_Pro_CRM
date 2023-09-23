# Customer Relationship Management - CRM


![image](https://github.com/RinkoQAQ/IT_Pro_CRM/assets/89683557/72fa9c5e-bc4e-41d6-8219-78a2d4dc3a71)

Our Personal CRM is a web application that allows you to manage your relationships and interactions with people efficiently. It serves as a central hub for keeping track of your various group of individuals, such as family, friends, collegues, and industry contacts. With our Personal CRM, you can organize, update, and maintain infomation about your contacts, ensuring that your connections are well-managed and your interactions are meaningful.



## Table of contents
- [Features](#features)
- [Code Standard](#code-standard)
  - [Frontend Standards](#frontend-standards)
  - [Backend Standards (Node.js)](#backend-standards-nodejs)
  - [MongoDB](#mongodb)
  - [GitHub](#github)
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



## Code Standard

### Frontend Standards

#### 1. HTML:

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

#### 2. CSS:

- **Selectors**: Avoid using ID selectors. Prefer class selectors.
- **Indentation**: Use two spaces for indentation.
- **Naming**: Use hyphens to separate words in class and ID names, e.g., .main-content.
- **Property Order**: Group related properties together. For example, positioning attributes should come before box model attributes.
- **Media Queries**: Place at the end or as close to their relevant rule sets as possible.

#### 3. JavaScript:

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

### Backend Standards (Node.js)

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

#### MongoDB

1. Follow MongoDB's document model and design appropriate collection structures based on project requirements.
2. Utilize MongoDB indexes to optimize query performance, especially for frequently used queries.
3. Regularly back up the MongoDB database to ensure data integrity and safety.
4. Implement appropriate authentication and access controls to protect the database's security.

### GitHub

1. Use Git for version control and ensure each commit has clear commit messages explaining the changes made.
2. Employ branching for development work, ensuring the main branch (typically master or main) remains stable.
3. Regularly merge the main branch to integrate new features and fixes.
4. Utilize GitHub's Issues and Pull Requests features for tracking tasks and collaboration.
5. Safeguard sensitive information such as passwords and API keys, storing them securely and not including them in version control.

### File Structure

1. **Organized Directory Structure:** Organize your project's directory structure logically, separating HTML, CSS, JavaScript, and other assets into distinct folders. For example:
   - `/
     - css/
     - js/
     - images/
     - html/
     - docs/
2. **Consistent File Naming:** Use consistent and descriptive file names. For example, use main.css instead of styles.css and index.html as the main entry point.

### Formatting Conventions

1. **Indentation and Spacing:** Use 4 spaces for indentation. Maintain consistent spacing and indentation throughout the codebase.
2. **Line Length:** Limit lines to a reasonable length (e.g., 80-120 characters) for readability.
3. **Brace Style:** Use a consistent brace style (e.g., "K&R" or "Allman") throughout the codebase.

### Naming Conventions

1. **Descriptive Variable Names:** Use clear and descriptive variable names that convey the purpose and content of the variable.
2. **Consistent Naming:** Maintain consistent naming conventions for variables, functions, classes, and identifiers. For example, use CamelCase for classes and PascalCase for constructors.

### Scoping Conventions

1. **Variable Scope:** Limit the scope of variables to the smallest block possible to avoid polluting the global scope.
2. **Avoid Global Variables:** Minimize the use of global variables to prevent unintended side effects.
3. **Module Scope:** Use module or function-level scope to encapsulate functionality and prevent namespace pollution.

### Usage Conventions

1. **Comments and Documentation:** Include comments to explain complex code sections or unusual behavior. Use JSDoc or other documentation tools for documenting functions and APIs.
2. **Use Constants:** Use constants (e.g., const in JavaScript) for values that should not be changed during runtime.
3. **Error Handling:** Implement appropriate error-handling mechanisms to gracefully handle unexpected situations.

### Compile Errors and Warnings

1. **Resolve Compiler Errors:** Ensure that all compiler errors are resolved before committing code changes to version control.
2. **Avoid Warnings:** Strive to keep the codebase free of compiler or linter warnings.

These standards and conventions help maintain code consistency, readability, and maintainability across the project. It's essential to establish these guidelines and ensure that all team members are aware of and follow them throughout the development process.
