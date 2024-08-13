import gsap from 'gsap'
import ScrollSmoother from 'gsap/dist/ScrollSmoother'
gsap.registerPlugin(ScrollSmoother)

export default class Scroll {
  constructor() {
    ScrollSmoother.create({
      smooth: 1,
      effects: true,
      normalizeScroll: true,
    })
  }
}
