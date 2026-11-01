import { cardsData } from "../../data/informationCards"

function InfoCards() {
    return (
        <section className="w-full bg-[#0c0c0c] py-12 text-white">
            <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-20">
                
                {/* Grid: 1 columna en móvil, 2 en tablet, 4 en PC */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/10">
                    
                    {cardsData.map((card) => {
                        const Icon = card.icon

                        return (
                            <div 
                                key={card.id} 
                                className="
                                    /* Estilos para móvil: Columna, centrado y línea inferior */
                                    flex flex-col items-center text-center gap-3 border-b border-white/10 py-8 last:border-b-0 last:pb-0 first:pt-0
                                    
                                    /* Estilos para escritorio (md en adelante): Fila, alineado a la izquierda y sin línea inferior */
                                    md:flex-row md:items-start md:text-left md:gap-4 md:border-none md:py-0 lg:px-8
                                "
                            >
                                
                                {/* Icono (más grande en móvil para que resalte) */}
                                <div className="shrink-0 text-[#e4cdb9]">
                                    <Icon className="h-7 w-7 md:h-6 md:w-6" strokeWidth={1.5} />
                                </div>

                                {/* Texto */}
                                <div className="flex flex-col gap-1.5">
                                    <h3 className="text-[15px] font-semibold tracking-wide">
                                        {card.title}
                                    </h3>
                                    <p className="text-[13px] leading-relaxed text-gray-400">
                                        {card.description}
                                    </p>
                                </div>

                            </div>
                        )
                    })}

                </div>
            </div>
        </section>
    )
}

export default InfoCards