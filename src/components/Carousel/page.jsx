import React from 'react'
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from '@components/Carousel/CarouselArrowButton'
import useEmblaCarousel from 'embla-carousel-react'

const EmblaCarousel = (props) => {
    const { slides, options } = props
    console.log(slides)
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
                <div className="embla__container">
                    {slides.map((slide, index) => (
                        <img key={index} src={slide} alt="slide" className="embla__slide" />
                        // <div className="embla__slide" key={index}>
                        //     <div className="embla__slide__number">{index + 1}</div>
                        // </div>
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
