import React from 'react';

// Sample project data
const projects = [
    {
        id: 1,
        title: 'Project Alpha',
        description: 'A distributed computing project that processes large datasets using the Quantum Grid framework.',
        technologies: ['JavaScript', 'TypeScript', 'Quantum Grid'],
        link: 'https://example.com/project-alpha',
    },
    {
        id: 2,
        title: 'Project Beta',
        description: 'A backend server utilizing Quantum Grid to enhance computational powers in research tasks.',
        technologies: ['Python', 'Flask', 'Quantum Grid'],
        link: 'https://example.com/project-beta',
    },
    {
        id: 3,
        title: 'Project Gamma',
        description: 'A real-time data analysis tool leveraging distributed computing capabilities of Quantum Grid.',
        technologies: ['React', 'Node.js', 'Quantum Grid'],
        link: 'https://example.com/project-gamma',
    },
];

const Page = () => {
    return (
        <div className="p-6 min-h-screen " >
            <h1 className="text-3xl font-bold text-center mb-8" >Projects Using Quantum Grid</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
                {projects.map((project) => (
                    <div key={project.id} className="bg-gray-100 rounded-lg shadow-md p-4 transition transform hover:scale-105" >
                        <h2 className="text-xl text-black text-center font-semibold mb-2" >{project.title} (EXAMPLE)</h2>
                        <p className="text-gray-700 mb-3" >{project.description}</p>

                        <h3 className="text-base text-black font-medium" >Technologies:</h3>
                        <ul className="list-disc list-inside mb-3" >
                            {project.technologies.map((tech, index) => (
                                <li key={index} className="text-gray-600" >{tech}</li>
                            ))}
                        </ul>

                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline" >
                            View Project
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;
