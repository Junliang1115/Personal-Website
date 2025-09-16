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

## Backend

```
node server/index.js
```

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

## Journey Page Animation Feature

### Feature Overview

This feature adds a sequential bounce-in animation to the image cards on the Journey page, followed by a subtitle reveal. When a user navigates to the Journey page:

1. **Card Animation:**

   - Each of the five image cards animates into place one after another, using a bounce/spring effect.
   - The cards start from a scaled-down and/or transparent state and animate to their final overlapped, rotated layout.
   - The animation is staggered, so each card appears shortly after the previous one.

2. **Subtitle Reveal:**
   - After the last card finishes its animation, the subtitle ("Pick a piece of my memory and press play.") fades or slides in.

### Technical Approach

- **Animation Library:** [Framer Motion](https://www.framer.com/motion/) is recommended for smooth, easy-to-control React animations.
- **Implementation Steps:**
  1. Install Framer Motion: `npm install framer-motion`
  2. Wrap each card in a `motion.div` with `initial`, `animate`, and `transition` props for bounce-in.
  3. Use staggered delays for each card's animation.
  4. Use React state to show the subtitle only after the last card's animation completes.
  5. Animate the subtitle with a fade or slide effect.

### Example Code Snippet

```jsx
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { scale: 0.7, opacity: 0, y: 80 },
  visible: (i) => ({
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0.5,
      delay: i * 0.18,
      duration: 0.7,
    },
  }),
};

// ...
{cards.map((card, i) => (
  <motion.div
    key={card.id}
    custom={i}
    initial="hidden"
    animate="visible"
    variants={cardVariants}
    // ...style and onClick
  >
    <img src={card.img} alt={card.alt} style={...} />
  </motion.div>
))}
```

### How to Use

1. Ensure Framer Motion is installed in your project.
2. Replace the card row in `JourneyPage.js` with the animated version as shown above.
3. Add logic to reveal the subtitle after the last card's animation (e.g., using a timer or Framer Motion's `onAnimationComplete`).

### Result

- The Journey page will have a lively, modern entrance animation for the cards and subtitle, enhancing user engagement and matching the described requirements.

---

Feel free to adjust the animation parameters (delay, bounce, duration) to best fit your design preferences!
