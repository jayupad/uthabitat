'use client'

import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { DotButton, useDotButton } from '@/components/EmblaCarouselDotButton'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import ClassNames from 'embla-carousel-class-names'
import Image from 'next/image'
import '@/app/styles/base.css'
import '@/app/styles/embla.css'

type PropType = {
  slides: string[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay(), ClassNames()])

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  return (
    <div className="theme-light">
      <section className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((slide, index) => (
              <div className="embla__slide" key={index}>
                <Image
                  src={slide}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-auto object-cover"
                  width={800}
                  height={400}
                />
              </div>
            ))}
          </div>
        </div>

        {/* <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div> */}
      </section>
    </div>
  )
}

export default EmblaCarousel
