import { processData } from "../data/processData"

function Process() {
  return (
    <section id="proceso" className="w-full bg-[#0c0c0c] py-20 text-white md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-20">
        
        <div className="mb-14 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
          <h2 className="font-serif text-4xl font-normal leading-[1.1] md:text-5xl lg:text-6xl">
            Nuestro proceso
          </h2>
          
          <p className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e4cdb9] md:pb-2 md:text-[11px]">
            <span className="hidden h-[1px] w-8 bg-[#e4cdb9] md:block" />
            Un camino claro hacia grandes espacios.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {processData.map((step, index) => (
            <div key={step.id} className="flex flex-col">
              
              <div className="mb-6 flex items-center gap-4">
                <span className="font-serif text-4xl text-[#e4cdb9] lg:text-5xl">
                  {step.id}
                </span>
                
                <div 
                  className={`h-[1px] flex-1 bg-white/20 ${
                    index === processData.length - 1 ? "lg:hidden" : ""
                  }`}
                />
              </div>

              <h3 className="mb-3 font-serif text-xl tracking-wide text-white md:text-2xl">
                {step.title}
              </h3>

              <p className="text-sm leading-relaxed text-gray-400 md:text-[15px]">
                {step.description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Process