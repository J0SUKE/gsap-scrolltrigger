import './style.css'
import './parallax-sections.css'
import './perspective-gallery.scss'
import Scroll from './components/scroll'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

class App {
  scroll: Scroll

  constructor() {
    this.scroll = new Scroll()

    this.setupPerspectiveGallery()
    this.setupParallaxSections()
  }

  setupPerspectiveGallery() {
    const container = document.querySelector('.perspective-gallery')
    const perspectiveWrapper = document.querySelector('.perspective-gallery-wrapper')
    const medias = [...document.querySelectorAll('.perspective-gallery__media-wrapper')] as HTMLElement[]
    const scales: number[] = []
    medias.forEach((media) => {
      scales.push(parseFloat(media.dataset.endScale as string))
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => '+' + window.innerHeight * 3,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    })

    tl.to(perspectiveWrapper, {
      z: '50dvh',
    })

    medias.forEach((media, index) => {
      tl.to(
        media,
        {
          scale: scales[index],
        },
        '<='
      )
    })
  }

  setupParallaxSections() {
    const sections = [...document.querySelectorAll('.pinned-section')] as HTMLElement[]
    const container = document.querySelector('.parallax-sections')
    const images = [...document.querySelectorAll('.img')]

    gsap.set(sections[0], { clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0)' })
    gsap.set(sections[1], { clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0)' })

    gsap.set(images[0], { clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0)' })
    gsap.set(images[1], { clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0)' })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => '+' + window.innerHeight * 3,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    })

    tl.to(sections[0], {
      clipPath: 'polygon(0 0, 0 0%, 100% 0%, 100% 0)',
      ease: 'none',
    }).to(sections[1], {
      clipPath: 'polygon(0 0, 0 0%, 100% 0%, 100% 0)',
      ease: 'none',
    })

    const imagesTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+` + window.innerHeight * 3,
        scrub: 1,
      },
    })

    imagesTl.to(images[0], {
      clipPath: 'polygon(0 0, 0 0%, 100% 0%, 100% 0)',
      ease: 'none',
    })

    imagesTl.to(images[1], {
      clipPath: 'polygon(0 0, 0 0%, 100% 0%, 100% 0)',
      ease: 'none',
    })
  }
}

export default new App()
