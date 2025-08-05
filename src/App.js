import './App.css';
import { useState } from 'react';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="App">
      <header className="App-header">
        <h1>John Doe</h1>
        <nav>
          <ul>
            <li>
              <button 
                className={activeSection === 'home' ? 'active' : ''}
                onClick={() => setActiveSection('home')}
              >
                Home
              </button>
            </li>
            <li>
              <button 
                className={activeSection === 'about' ? 'active' : ''}
                onClick={() => setActiveSection('about')}
              >
                About
              </button>
            </li>
            <li>
              <button 
                className={activeSection === 'projects' ? 'active' : ''}
                onClick={() => setActiveSection('projects')}
              >
                Projects
              </button>
            </li>
            <li>
              <button 
                className={activeSection === 'contact' ? 'active' : ''}
                onClick={() => setActiveSection('contact')}
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {activeSection === 'home' && (
          <section className="home-section">
            <h2>Welcome to My Personal Website</h2>
            <p>Hi, I'm John Doe. I'm a web developer passionate about creating beautiful and functional websites.</p>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="about-section">
            <h2>About Me</h2>
            <p>I have experience in React, JavaScript, HTML, and CSS. I love solving problems and creating user-friendly interfaces.</p>
            <div className="skills">
              <h3>My Skills</h3>
              <ul>
                <li>React</li>
                <li>JavaScript</li>
                <li>HTML & CSS</li>
                <li>Node.js</li>
                <li>Git</li>
              </ul>
            </div>
          </section>
        )}

        {activeSection === 'projects' && (
          <section className="projects-section">
            <h2>My Projects</h2>
            <div className="project-grid">
              <div className="project-card">
                <h3>Project 1</h3>
                <p>A description of project 1</p>
                <div className="project-links">
                  <a href="#" target="_blank" rel="noopener noreferrer">View Project</a>
                  <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
              <div className="project-card">
                <h3>Project 2</h3>
                <p>A description of project 2</p>
                <div className="project-links">
                  <a href="#" target="_blank" rel="noopener noreferrer">View Project</a>
                  <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
              <div className="project-card">
                <h3>Project 3</h3>
                <p>A description of project 3</p>
                <div className="project-links">
                  <a href="#" target="_blank" rel="noopener noreferrer">View Project</a>
                  <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'contact' && (
          <section className="contact-section">
            <h2>Contact Me</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>
              <button type="submit">Send Message</button>
            </form>
            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
          </section>
        )}
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} John Doe. All rights reserved.</p>
      </footer>
    </div>
  );

export default App;
