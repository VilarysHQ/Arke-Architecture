import { X } from "lucide-react"

function ProjectModal({ project, onClose }) {
    // Si no hay proyecto, no renderizamos nada (prevención de errores)
    if (!project) return null

    return (
        // Overlay background (click to close)
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={onClose}
        >
            {/* Modal Container (stop propagation so it doesn't close when clicking inside) */}
            <div 
                className="relative flex w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-[#111] shadow-2xl md:flex-row"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-[#e4cdb9] hover:text-black"
                >
                    <X size={20} />
                </button>

                {/* Left Column: Image */}
                <div className="w-full md:w-3/5">
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        className="h-[40vh] w-full object-cover md:h-full"
                    />
                </div>

                {/* Right Column: Details */}
                <div className="flex w-full flex-col justify-center p-8 md:w-2/5 lg:p-12">
                    
                    {/* Category & Location */}
                    <div className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-widest text-[#e4cdb9]">
                        <span>{project.category}</span>
                        <span className="h-3 w-[1px] bg-white/20"></span>
                        <span>{project.location}</span>
                    </div>

                    {/* Title */}
                    <h2 className="mb-6 font-serif text-3xl text-white lg:text-4xl">
                        {project.title}
                    </h2>

                    {/* Description */}
                    <p className="mb-8 text-sm leading-relaxed text-gray-400">
                        {project.description}
                    </p>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-500">Año</p>
                            <p className="mt-1 text-sm text-white">{project.year}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-500">Área</p>
                            <p className="mt-1 text-sm text-white">{project.area}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-[10px] uppercase tracking-widest text-gray-500">Arquitecto</p>
                            <p className="mt-1 text-sm text-white">{project.architect}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProjectModal