# Personal Website - React

A modern, responsive personal website built with React. This project provides a clean and professional template for showcasing your portfolio, skills, and contact information.

## Features

- Single-page application with smooth navigation
- Responsive design that works on all devices
- Clean and modern UI with animations
- Sections for Home, About, Projects, and Contact
- Customizable content and styling

## Technologies Used

- React.js
- CSS3 with modern features
- Responsive design principles
- Git for version control

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/personal-website.git
   ```

2. Navigate to the project directory
   ```
   cd personal-website
   ```

3. Install dependencies
   ```
   npm install
   ```

4. Start the development server
   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser

## Customization

### Personal Information

Edit the content in `App.js` to update your personal information, skills, projects, and contact details.

### Styling

The styling is contained in:
- `src/App.css` - Component-specific styles
- `src/index.css` - Global styles

Modify these files to customize colors, fonts, spacing, and other visual elements.

## Deployment

This project can be deployed to various platforms:

### GitHub Pages

1. Install gh-pages package
   ```
   npm install --save gh-pages
   ```

2. Add homepage to package.json
   ```json
   "homepage": "https://yourusername.github.io/personal-website"
   ```

3. Add deploy scripts to package.json
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```

4. Deploy the site
   ```
   npm run deploy
   ```

### Netlify, Vercel, or other platforms

Follow the platform-specific deployment instructions, typically involving connecting your GitHub repository and configuring build settings.

## License

This project is open source and available under the MIT License.
