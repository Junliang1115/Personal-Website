import React, { useState, useEffect } from 'react';

const ProjectCard = ({ title, description, link, hackathonName, type }) => {
  return (
    <div style={{ 
      background: 'rgba(122, 46, 46, 0.7)', 
      color: '#F5EAEA',
      border: '2px solid #5C1F1F',  
      borderRadius: '8px',
      padding: '30px',
      position: 'relative',
      flexShrink: 0,
      minHeight: '200px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      zIndex: 1,
    }}>
      {hackathonName && (
          <div style={{ position: 'absolute', top: '45px', right: '35px', fontSize: '14px',fontWeight: 600, color: '#ffd900ff' }}>
            {hackathonName}
          </div>
        )}
        <div>
          <h3 style={{ marginTop: '10px', fontSize: '24px', color: '#F5EAEA', fontWeight:'bold', marginBottom:'20px' }}>{title}</h3>
          <p style={{ marginTop: '10px', color: '#F5EAEA' }}>{description}</p>
        </div>

        {type && (
          <div style={{ position: 'absolute', bottom: '35px', left: '30px', fontSize: '12px',fontWeight: 600, color: '#ffd900ff' , border: '1.5px solid #ffd900ff', padding: '5px 10px', borderRadius: '20px'}}>
            {type}
          </div>
        )}
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" style={{
            alignSelf: 'flex-end',
            background: '#5C1F1F',
            border: '1px solid #ffffffff',
            cursor: 'pointer',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '5px',
            textDecoration: 'none',
            fontSize: '14px',
            marginTop: '10px'
          }}>
            More Details
          </a>
        )}
    </div>
  );
};

const Projects = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://junliang-portfolio-backend.onrender.com/api/hackathons');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjectData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p style={{ color: 'white', textAlign: 'center' }}>Loading projects...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '100px' }}>
      {projectData.map((project, index) => (
        project.link ? (
          <ProjectCard key={index} title={project.projectname} description={project.description} link={project.link} hackathonName={project.name} type={project.type}/>
        ) : null
      ))}
    </div>
  );
};

function ProjectPage() {
  return (
    <div style={{ height: '100vh', overflowY: 'scroll', scrollSnapType: 'y mandatory' }}>
      <section style={{ height: '100vh', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '24px' }}>
        <div style={{ fontFamily: 'Instrument Sans', fontStyle: 'normal', fontWeight: 700, fontSize: '64px', lineHeight: '78px', color: '#FFFFFF', textAlign: 'left' , marginLeft: "150px"}}>
          Welcome to my<br />digital playground
        </div>
        <div style={{ fontFamily: 'Instrument Sans', fontStyle: 'normal', fontWeight: 600, fontSize: '36px', lineHeight: '44px', color: '#FFFFFF', textAlign: 'left',marginLeft: "150px", marginTop: '20px' }}>
          — where experiments spark, ideas grow, and creations come alive.
        </div>
      </section>
      <section style={{ height: '100vh', scrollSnapAlign: 'start', padding: '80px 24px 24px 24px' }}>
        <h2 style={{ color: '#fff', fontSize: '48px', textAlign: 'center', marginTop: '40px', marginBottom: '10px', fontWeight: 'bold' }}>Project Showcase</h2>
        <p style={{ color: '#fff', fontSize: '25px', textAlign: 'center', marginBottom: '40px' }}>Ideas in motion. Projects in action.</p>
        <Projects />
      </section>
    </div>
  );
}

export default ProjectPage;