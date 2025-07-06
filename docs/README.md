# Grades Calculator Project Documentation

## Introduction
This documentation provides a beginner-friendly overview of the main components of the Grades Calculator Angular project, focusing on the Signup, Login, and Dashboard functionalities.

---

## Signup Component

### Overview
The Signup component allows new users to create an account. It captures user input such as email and password, validates these inputs, and communicates with the backend service to register the user.

### How It Works
- **User Interface:** The Signup component presents a form with fields for email and password.
- **Validation:** It checks for valid email format and that the password meets the required criteria before submission.
- **Backend Integration:** Upon form submission, the component calls an authentication service to create a new user account.
- **Feedback:** It displays success or error messages based on the response from the backend.

### Important Files
- `signup.component.ts`: Contains the logic including form handling and service calls.
- `signup.component.html`: Contains the markup and form inputs.
- `auth.service.ts`: Provides methods to communicate with the authentication backend.

### Notes for Beginners
- Angular components consist of a TypeScript file (logic) and an HTML template.
- Services like `auth.service.ts` are used to separate backend communication from UI logic.
- Reactive forms or template-driven forms are common in Angular for handling user inputs.

---

## Login Component

### Overview
The Login component handles user authentication. It allows existing users to sign in with their credentials and redirects them to the dashboard upon successful authentication.

### How It Works
- **User Interface:** The Login component displays a form with email and password fields.
- **Authentication:** When the form is submitted, it calls the authentication service to verify user credentials.
- **Navigation:** Upon successful login, the user is redirected to the dashboard page.
- **Error Handling:** Displays appropriate error messages if login fails.

### Important Files
- `login.component.ts`: Contains the authentication logic and navigation handling.
- `login.component.html`: Contains the login form markup.
- `auth.service.ts`: Provides authentication methods shared with the signup component.

### Navigation Flow
1. User enters credentials
2. Form submission triggers `onLogin()` method
3. Authentication service validates credentials
4. On success: Navigate to `/dashboard`
5. On failure: Display error message

---

## Dashboard Component

### Overview
The Dashboard serves as the main landing page after successful login. It provides navigation to all major features of the application and displays the current status.

### Features
- **Navigation Bar:** Contains four main options:
  - "Consultar Notas" (View Grades)
  - "Agregar Notas" (Add Grades)
  - "Calcular Materia" (Calculate Subject)
  - "Visualizar Progreso" (View Progress)
- **Branding:** Displays the "GRADES CALCULATOR" title
- **Logo:** Shows the application logo
- **Status:** "APP UNDER CONSTRUCTION..." message

### Important Files
- `dashboard.component.ts`: Contains the dashboard logic and navigation methods.
- `dashboard.component.html`: Contains the dashboard layout and navigation elements.
- `dashboard.component.scss`: Contains styling for the dashboard appearance.

### Styling Notes
- Uses Bootstrap classes for responsive design
- Custom SCSS for navbar styling and logo positioning
- Gradient backgrounds and modern UI elements

---

## Routing Configuration

### Overview
The application uses Angular Router to handle navigation between different pages.

### Current Routes
- `/` - Redirects to signup page
- `/signup` - Signup component
- `/login` - Login component  
- `/dashboard` - Dashboard component (requires authentication)

### Important Files
- `app.routes.ts`: Defines all application routes and navigation paths.

---

## Authentication Service

### Overview
The authentication service handles all backend communication related to user authentication and registration.

### Key Methods
- `signup()`: Creates new user accounts
- `login()`: Authenticates existing users
- `logout()`: Handles user logout
- Token management for maintaining user sessions

### Important Files
- `auth.service.ts`: Contains all authentication-related methods and HTTP calls.

---

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── signup/
│   │   ├── login/
│   │   └── dashboard/
│   ├── services/
│   │   └── auth.service.ts
│   ├── app.routes.ts
│   └── app.component.ts
├── assets/
│   └── logo.jpg
└── docs/
    └── README.md
```

---

## Next Steps for Development

1. **Complete Authentication Flow**: Ensure proper error handling and success feedback
2. **Implement Dashboard Features**: Add functionality for each navbar option
3. **Add Guards**: Implement route guards to protect authenticated routes
4. **Testing**: Add unit tests for components and services
5. **Styling**: Refine UI/UX design and responsiveness

---

## Getting Started

### Prerequisites
- Node.js and npm installed
- Angular CLI installed (`npm install -g @angular/cli`)

### Running the Application
1. Navigate to project directory
2. Run `npm install` to install dependencies
3. Run `ng serve` to start development server
4. Navigate to `http://localhost:4200`

### Development Commands
- `ng serve` - Start development server
- `ng build` - Build the project
- `ng test` - Run unit tests
- `ng generate component <name>` - Generate new component

---

## Troubleshooting

### Common Issues
1. **Login redirects to signup instead of dashboard**: Check that the authentication service returns proper success response
2. **Routes not working**: Verify that all routes are properly defined in `app.routes.ts`
3. **Styling issues**: Ensure Bootstrap is properly imported and custom SCSS is compiled

### Debug Tips
- Use browser developer tools to inspect network requests
- Check console for error messages
- Verify that all imports are correct in TypeScript files
