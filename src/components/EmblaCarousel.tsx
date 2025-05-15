'use client'

import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
// import { DotButton, useDotButton } from '@/components/EmblaCarouselDotButton'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import ClassNames from 'embla-carousel-class-names'
import Image from 'next/image'
import '@/app/styles/base.css'
import '@/app/styles/embla.css'

interface Slide {
  page: string,
  image: string
  alt: string
}

type PropType = {
  slides: Slide[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const filteredSlides = slides.filter((slide) => slide.page === 'carousel')
  // console.log('slides', slides)
  const [emblaRef /*, emblaApi */] = useEmblaCarousel(options, [Autoplay(), ClassNames()])

  // const { selectedIndex, scrollSnaps, onDotButtonClick } =
  //   useDotButton(emblaApi)

  return (

    <div className="theme-light">
      <section className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {filteredSlides.map((slide, index) => (
              <div className="embla__slide" key={index}>
                {/* Maintain aspect ratio container */}
                <div className="relative w-full aspect-[5/4] overflow-hidden">
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>

  )
}

export default EmblaCarousel
