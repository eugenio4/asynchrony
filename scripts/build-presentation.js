const H = require('highland')
const R = require('ramda')
const fs = require('fs')
const path = require('path')
const revealOpt = require('../reveal-md.json')

const EOL = require('os').EOL
const SRC_PATH = path.join(__dirname, '../presentation/')
const VERTICAL_SEPARATOR = `${EOL}${revealOpt.verticalSeparator}${EOL}`
const SEPARATOR = `${EOL}${revealOpt.separator}${EOL}`
const SLIDES_PATH = R.concat(SRC_PATH, 'slides.md')
const isMdFile = name => name.includes('.md')
const folders = R.pipe(R.unary(fs.readdirSync), R.reject(isMdFile))

const makeVerticalSliders = src => {
    const slides = fs.readdirSync(src)

    const s = slides
        .map(R.concat(src + '/'))
        .map(R.unary(fs.createReadStream))
        .map(H)

    const verticalSliders = R.intersperse(H.of(VERTICAL_SEPARATOR), s)
    return verticalSliders
}

const makeSliders = (src, dest) => {
    const horizontalSliders = folders(src).map(R.concat(src))
    const verticalSliders = R.map(makeVerticalSliders, horizontalSliders)
    const sliders = R.intersperse(H.of(SEPARATOR), verticalSliders)

    return H(sliders)
        .flatten()
        .pipe(fs.createWriteStream(dest))
}

makeSliders(SRC_PATH, SLIDES_PATH)