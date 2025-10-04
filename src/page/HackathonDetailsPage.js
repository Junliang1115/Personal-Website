import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';
import { FaGithub } from 'react-icons/fa';

function HackathonDetailsPage() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [hackathon, setHackathon] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const formattedName = name.replace(/-/g, ' ');
        fetch(`https://junliang-portfolio-backend.onrender.com/api/hackathons/${formattedName}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Hackathon not found');
                }
                return res.json();
            })
            .then(data => setHackathon(data))
            .catch(err => setError(err.message));
    }, [name]);

    if (error) {
        return <div className="text-white text-center p-8">{error}</div>;
    }

    if (!hackathon) {
        return <div className="text-white text-center p-8">Loading...</div>;
    }

    let embedUrl = '';
    if (hackathon.driveUrl) {
        if (hackathon.driveUrl.includes('/presentation/d/e/')) {
            embedUrl = hackathon.driveUrl;
        } else {
            const match = hackathon.driveUrl.match(/\/d\/(.*?)(\/|$)/);
            if (match && match[1]) {
                const fileId = match[1];
                embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
            }
        }
    } else if (hackathon.youtubeUrl) {
        embedUrl = hackathon.youtubeUrl.replace("watch?v=", "embed/");
    }

    return (
        <div className="w-full min-h-screen pt-24 font-instrument-sans">
            <div className="bg-[#4b2a2a] shadow-lg w-full mx-auto overflow-y-auto relative text-white pt-10 pb-20 md:p-20 rounded-2xl z-1">
                <button onClick={() => navigate(-1)} className="absolute top-4 right-4 text-white text-3xl font-bold">&times;</button>
                
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold">{hackathon.name}</h1>
                    {hackathon.projectname && (
                        <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">{hackathon.projectname}</h2>
                    )}
                    {hackathon.teamname && (
                        <p className="text-lg md:text-xl mt-2 text-yellow-400">Team: {hackathon.teamname}</p>
                    )}
                    {hackathon.teammate && hackathon.teammate.length > 0 && (
                        <p className="mt-4 text-lg">{hackathon.teammate.join(' | ')}</p>
                    )}
                </div>

                <div className="flex flex-col md:flex-row justify-center items-start mt-8 gap-4">
                    {hackathon.link && (
                        <a href={hackathon.link} target="_blank" rel="noopener noreferrer" className="text-4xl hover:text-yellow-400 transition-colors">
                            <FaGithub />
                        </a>
                    )}
                    
                    <div className="w-full max-w-7xl z-10">
                        {embedUrl && (
                            <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg">
                                <iframe
                                    src={embedUrl}
                                    title={hackathon.name}
                                    frameBorder="0"
                                    className="w-full h-full rounded-lg"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 text-justify max-w-7xl mx-auto">
                    <p className="text-yellow-400 text-lg">Project Description</p>
                    <h3 className="text-2xl md:text-3xl font-bold mt-2">What Is This Project About?</h3>
                    <p className="mt-4 text-base">{hackathon.description}</p>
                </div>

                {hackathon.corefeature && hackathon.corefeature.length > 0 && (
                    <div className="mt-8 text-justify max-w-7xl mx-auto">
                    <p className="text-yellow-400 text-lg">Core Features</p>
                    <h3 className="text-2xl md:text-3xl font-bold mt-2">What This Project Can Do?</h3>
                        <ul className="list-disc mt-4 space-y-2">
                            {hackathon.corefeature.map((feature, idx) => (
                                <li key={idx}>
                                    <strong className="font-bold">{feature.name}:</strong> {feature.details}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {hackathon.techstack && (
                    <div className="mt-8 text-justify max-w-7xl mx-auto">
                        <p className="text-yellow-400 text-base md:text-lg">Tech Stack</p>
                        <h3 className="text-2xl md:text-3xl font-bold mt-2">Technologies Used</h3>
                        <div className="mt-4">
                            {hackathon.techstack.frontend && hackathon.techstack.frontend.length > 0 && (
                                <div className="mt-2">
                                    <strong className="font-bold">Frontend:</strong>
                                    <div className="flex flex-wrap mt-1">
                                        {hackathon.techstack.frontend.map(tech => (
                                            <span key={tech} className="rounded-full text-white px-3 py-1 m-1 border-2 border-[#ffffff]" style={{ borderWidth: '2px' }}>{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {hackathon.techstack.backend && hackathon.techstack.backend.length > 0 && (
                                <div className="mt-2">
                                    <strong className="font-bold">Backend:</strong>
                                    <div className="flex flex-wrap mt-1">
                                        {hackathon.techstack.backend.map(tech => (
                                            <span key={tech} className="rounded-full  text-white px-3 py-1 m-1 border-2 border-[#ffffff]" style={{ borderWidth: '2px' }}>{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {hackathon.techstack.database && hackathon.techstack.database.length > 0 && (
                                <div className="mt-2">
                                    <strong className="font-bold">Database:</strong>
                                    <div className="flex flex-wrap mt-1">
                                        {hackathon.techstack.database.map(tech => (
                                            <span key={tech} className="rounded-full text-white px-3 py-1 m-1 border-2 border-[#ffffff]" style={{ borderWidth: '2px' }}>{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {hackathon.techstack.ai_ml && hackathon.techstack.ai_ml.length > 0 && (
                                <div className="mt-2">
                                    <strong className="font-bold">AI/ML:</strong>
                                    <div className="flex flex-wrap mt-1">
                                        {hackathon.techstack.ai_ml.map(tech => (
                                            <span key={tech} className="rounded-full text-white px-3 py-1 m-1 border-2 border-[#ffffff]" style={{ borderWidth: '2px' }}>{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {hackathon.techstack.externalAPIs && hackathon.techstack.externalAPIs.length > 0 && (
                                <div className="mt-2">
                                    <strong className="font-bold">External APIs:</strong>
                                    <div className="flex flex-wrap mt-1">
                                        {hackathon.techstack.externalAPIs.map(tech => (
                                            <span key={tech} className="rounded-full text-white px-3 py-1 m-1 border-2 border-[#ffffff]" style={{ borderWidth: '2px' }}>{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HackathonDetailsPage;