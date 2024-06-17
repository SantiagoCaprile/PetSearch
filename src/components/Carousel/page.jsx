import React from 'react'
import Image from 'next/image'
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from '@components/Carousel/CarouselArrowButton'
import useEmblaCarousel from 'embla-carousel-react'

const EmblaCarousel = (props) => {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options ? options : { "loop": true })

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    return (
        <section className="embla flex flex-col justify-center items-center">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container max-h-[400px]">
                    {slides.map((slide, index) => (
                        <Image key={index}
                            priority={index === 0}
                            src={slide} alt="slide" className="embla__slide" width={400} height={400} />
                    ))}
                </div>
            </div>

            <div className="embla__controls">
                <div className="embla__buttons">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>
            </div>
        </section>
    )
}

export default EmblaCarousel
