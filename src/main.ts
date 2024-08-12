import './style.css'
import Scroll from './components/scroll'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

class App {
  scroll: Scroll

  constructor() {
    this.scroll = new Scroll()

    //this.runTests()
    this.setupPinnedSections()
  }

  setupPinnedSections() {
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
        end: () => `+` + window.innerHeight * 3,
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
