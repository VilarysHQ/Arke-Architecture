import { processData } from "../data/processData"

function Process() {
  return (
    <section className="w-full bg-[#0c0c0c] py-20 text-white">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-20">
        
        {/* Header Section */}
        <div className="mb-14 flex items-end justify-between">
          <h2 className="font-serif text-4xl md:text-5xl">Nuestro proceso</h2>
          
          <p className="hidden text-sm text-gray-400 md:block">
            Un camino claro hacia grandes espacios.
          </p>
        </div>

        {/* Process Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {processData.map((step, index) => (
            <div key={step.id} className="flex flex-col">
              
              {/* Number and Line Container */}
              <div className="mb-6 flex items-center gap-4">
                <span className="font-serif text-3xl text-[#e4cdb9] lg:text-4xl">
                  {step.id}
                </span>
                
                {/* The Line: hidden on the last item so it doesn't extend into nothingness */}
                <div 
                  className={`h-[1px] flex-1 bg-white/20 ${
                    index === processData.length - 1 ? "lg:hidden" : ""
                  }`}
                ></div>
              </div>

              {/* Title */}
              <h3 className="mb-2 text-base font-semibold tracking-wide">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-gray-400">
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