import { cardsData } from "../../data/informationCards"

function InfoCards() {
    return (
        <section className="w-full bg-[#0c0c0c] px-4 py-12 text-white md:px-6">
            
            <div className="mx-auto w-full max-w-[1800px]">
                
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/10">
                    
                    {cardsData.map((card) => {
                        const Icon = card.icon

                        return (
                            <div key={card.id} className="flex flex-row items-start gap-4 lg:px-6">
                                
                                {/* Icon */}
                                <div className="shrink-0 text-[#e4cdb9] mt-0.5">
                                    <Icon size={24} strokeWidth={1.5} />
                                </div>

                                {/* Text */}
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-[14px] font-semibold tracking-wide">
                                        {card.title}
                                    </h3>
                                    <p className="text-[12px] leading-relaxed text-gray-400">
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