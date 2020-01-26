const fs = require('fs')
const csm = require('./cyber-safety-module.json')

const setSpecificJSX = (module1) => {
  const passages = module1.passages
  const entries = Object.values(passages)
  entries.forEach(setParagraphStart)
  handleCellPassages(passages)
  handleEmbeddedLinks(passages)
  fs.writeFileSync('./src/stories/cyber-safety-module.json', JSON.stringify(module1, null, 2))
}

const cellPassages = []

function setParagraphStart(e) {
  handleArrayContent(e)
  e.content.forEach(c => {
    if (Array.isArray(c) || typeof c === 'object') return
    const charcode = c.content.charCodeAt(0)
    const isCapital = charcode >= 65 && charcode <= 90
    if (c.JSXType === 'text' && isCapital) {
      c.JSXType = 'text:paragraphStart'
    }
    if (c.content.includes('cell')) cellPassages.push(e.name)
  })
}

function handleArrayContent(e) {
  if (!Array.isArray(e.content)) {
    e.content = [e.content]
  }
  e.content.forEach((c, i) => {
    if (Array.isArray(c)) {
      const start = e.content.slice(0, i)
      const end = e.content.slice(i + 1)
      let x = [...start, ...c, ...end]
      e.content = [...start, ...c, ...end]
    }
  })
}

function handleCellPassages(passages) {
  cellPassages.forEach(id => {
    const passage = passages[id]
    const cellJSX = passage.content.reduce((acc, entry) => {
      if (entry.content.includes('contact')) {
        acc.name = getContact(entry)
      }
      if (entry.content.includes('msg')) {
        if (!acc.messages) acc.messages = []
        const text = handleMessage(entry.content)
        if (!text.text) return acc
        else acc.messages.push(text)
      }
      return acc
    }, {})
    passages[id].content = {
      JSXType: 'phone',
      content: cellJSX,
      linksTo: null
    }
  })
}

function getContact(entry) {
  content = entry.content.split('>')
  for (let tag of content) {
    let charcode = tag.trim().charCodeAt(0)
    const isCapital = charcode >= 65 && charcode <= 90
    if (isCapital) return tag.trim().split(' ')[0]
  }
}

function handleMessage(msg) {
  const text = msg.split('>')[1].split('<')[0]
  return {
    isReceived: msg.includes('get'),
    text
  }
}

// group the prev, middle, and next
// JSXType: 'embeddedLink'
// content: [ { 
//  JSXType: text:paragraphStart | text | link
//  content: string
//  linksTo null | string
// }],
// linksTo:null


function handleEmbeddedLinks(passages) {
  Object.values(passages).forEach(passageData => {
    for (let i = 0; i < passageData.content.length; i++) {
      const jsx = passageData.content[i]

      if (jsx.JSXType === 'link') {
        if(passageData[i + 1] && passageData[i + 1].JSXType === 'link' ) {jsx.JSXType === 'link: action'; continue}
        if(passageData[i - 1] && passageData[i - 1].JSXType === 'link' ) {jsx.JSXType === 'link:action'; continue}
        let spliceBy = 1
        let spliceIdx = i
        const replacement = {
          JSXType: 'link:embedded',
          content: [passageData.content[i]],
          linksTo: null
        }
        if (passageData.content[i - 1]) {
          replacement.content.unshift(passageData.content[i - 1])
          spliceBy++
          spliceIdx = i - 1
        }

        if (passageData.content[i + 1]) {
          replacement.content.push(passageData.content[i + 1])
          spliceBy++
        }

        passageData.content.splice(spliceIdx, spliceBy, replacement)
      }
    }
  })
}


setSpecificJSX(csm)