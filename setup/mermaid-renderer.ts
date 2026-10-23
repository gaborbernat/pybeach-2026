import { defineMermaidRendererSetup } from '@slidev/types'
import mermaid from 'mermaid/dist/mermaid.esm.mjs'

export default defineMermaidRendererSetup(() => async (code, options) => {
  const dark = options.theme === 'dark'
  const ink = dark ? '#f1f5f9' : '#182536'
  const background = dark ? '#111111' : '#ffffff'
  const blue = dark ? '#203e61' : '#dcecff'
  const border = dark ? '#93c5fd' : '#356aa0'
  const palette = dark
    ? { source: '#203e61', dependency: '#204d3d', build: '#59431e', publish: '#493660', install: '#164c50', danger: '#602d40' }
    : { source: '#dcecff', dependency: '#d9f2e5', build: '#ffedc7', publish: '#eee0fa', install: '#d6f0ef', danger: '#fbdce4' }

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'base',
    look: 'classic',
    fontSize: 22,
    themeCSS: `rect.actor[name="P"] { fill: ${palette.publish}; }`,
    flowchart: { curve: 'linear', nodeSpacing: 35, rankSpacing: 45 },
    sequence: {
      mirrorActors: false, actorFontSize: 22, messageFontSize: 22,
      width: 210, height: 56, messageMargin: 28, activationWidth: 20,
    },
    themeVariables: {
      fontFamily: 'sans-serif',
      fontSize: '20px',
      background,
      primaryColor: blue,
      primaryTextColor: ink,
      primaryBorderColor: border,
      secondaryColor: palette.publish,
      tertiaryColor: palette.dependency,
      textColor: ink,
      lineColor: dark ? '#aab9cd' : '#506078',
      edgeLabelBackground: background,
      nodeTextColor: ink,
      actorBkg: blue,
      actorTextColor: ink,
      actorBorder: border,
      actorLineColor: dark ? '#aab9cd' : '#506078',
      activationBkgColor: dark ? '#357654' : '#9bdfb8',
      activationBorderColor: dark ? '#7cdaa5' : '#16744a',
      signalColor: ink,
      signalTextColor: ink,
      labelBoxBkgColor: background,
      labelBoxBorderColor: border,
      labelTextColor: ink,
      noteBkgColor: palette.build,
      noteTextColor: ink,
      noteBorderColor: border,
    },
  })

  if (/^flowchart\s/m.test(code))
    code += Object.entries(palette).map(([name, fill]) => `\nclassDef ${name} fill:${fill},color:${ink},stroke:${border},stroke-width:1.5px`).join('')

  return (await mermaid.render(`diagram-${crypto.getRandomValues(new Uint32Array(4)).join('-')}`, code)).svg
})
