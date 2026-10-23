import { defineConfig } from 'unocss'

export default defineConfig({
  shortcuts: {
    highlight: 'fw600 text-[#8a6a00] dark:(text-[#fcd34d])',
    'ref-mark': 'text-[0.6em] align-super text-blue-700 dark:text-blue-300 fw600 ml-0.5',
    'refs-bar': 'absolute bottom-3 left-14 right-38 text-[11px] leading-tight opacity-75 text-left flex flex-col gap-1',
    'stage-label': 'text-sm uppercase tracking-widest text-blue-700 dark:text-blue-300 mb-3',
  },
})
