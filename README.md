

This project leverages modern web development tools and frameworks to build a responsive and feature-rich application. The goal is to deliver an efficient and user-friendly experience, incorporating advanced techniques for managing data, forms, and UI interactions.
Features
## Technologies Used

- Frontend Framework: React with ViteJS for fast development and optimized builds.
- Styling: TailwindCSS and TailwindUI for utility-first CSS and pre-designed components.
- Component Library: Shadcn for additional UI components and styling flexibility.
- Routing: React Router DOM for client-side routing.
- HTTP Requests: Axios for HTTP requests, with use-axios hooks to simplify request handling in React components.

### Form Management & Validation

- Form Handling: react-hook-forms for managing forms efficiently with minimal re-renders.
- Validation: Zod for schema-based form validation.

### State Management & Optimization

- Global State: Context API to implement a common search input across the application.
- Debouncing: Techniques applied to throttle requests, optimizing performance during high-frequency actions like search.

### Data Handling

- Local Storage: Used to save drafts of edited posts.
- Dynamic Table Component: A versatile table component with:
- Row selection and selection-based callbacks.
- Dynamic actions tied to user-selected rows.
- Built-in sorting and filtering functions.
- Pagination for efficient data navigation.

### Filtering Optimization

Checked if the total items from the API response fit within the display-per-page limit:
    If true, data is filtered locally for faster interaction.
    If false, API requests are made for filtering to ensure accurate results.

### Installation & Setup

Clone the repository:

```sh
git clone https://github.com/AlbeseMatoshi/thriveProtocol
cd thriveProtocol
cp .env.example .env
```

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Build for production:

```sh
npm run build
```

