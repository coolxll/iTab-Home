import React, { useState } from 'react'

const MOTTOS = [
  '「 莫愁千里路，自有到来风。 」',
  '「 行到水穷处，坐看云起时。 」',
  '「 追光的人，终会万丈光芒。 」',
  '「 满怀希望，就会所向披靡。 」',
  '「 愿历经千帆，归来仍是少年。 」',
  '「 山高自有客行路，水深自有渡船人。 」',
]

export const FooterMotto: React.FC = () => {
  const [index, setIndex] = useState(0)

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % MOTTOS.length)
  }

  return (
    <div className="w-full flex justify-center py-4 select-none">
      <p
        onClick={handleNext}
        className="text-xs text-white/70 hover:text-white transition-colors duration-300 drop-shadow cursor-pointer tracking-widest font-light"
        title="点击切换诗词金句"
      >
        {MOTTOS[index]}
      </p>
    </div>
  )
}
