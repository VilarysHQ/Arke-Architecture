import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { projectsData } from "../data/projectsData"
import ProjectModal from "../components/Projects/ProjectModal"

function Projects() {
    const [selectedProject, setSelectedProject] = useState(null)

    return (
        <>
            <section className="w-full bg-[#0c0c0c] py-20 text-white">
                <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-20">

                    {/* Header Section */}
                    <div className="mb-10 flex items-end justify-between border-b border-white/10 pb-4">
                        <h2 className="font-serif text-4xl md:text-5xl">Proyectos destacados</h2>
                        <a href="/" className="hidden items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white md:flex">
                            Ver todos los proyectos
                            <ArrowRight size={16} />
                        </a>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {projectsData.map((project) => (
                            <div 
                                key={project.id} 
                                className="group cursor-pointer" 
                                onClick={() => setSelectedProject(project)}
                            >
                                {/* Image Container */}
                                <div className="relative aspect-[4/3] w-full overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                {/* Info Container */}
                                <div className="flex items-center justify-between border-b border-white/10 py-5">
                                    <div>
                                        <h3 className="mb-1 text-lg font-serif">{project.title}</h3>
                                        <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-gray-400">
                                            <span>{project.category}</span>
                                            <span className="h-3 w-[1px] bg-white/20"></span>
                                            <span>{project.location}</span>
                                        </div>
                                    </div>
                                    <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors group-hover:bg-white group-hover:text-black">
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal Component */}
            <ProjectModal 
                project={selectedProject} 
                onClose={() => setSelectedProject(null)} 
            />
        </>
    )
}

export default Projects