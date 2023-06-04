import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDataTable } from 'vuetify/labs/VDataTable'


export const vuetify = createVuetify({
  components: {
    ...components,
    VDataTable
  },
  directives,
  theme: {
    themes: {
        light: {
            dark: false,
            colors: {
                primary: '#0d0d19',
                secondary: '#ffffff',
                blauwzwart: '#0d0d19',
                donkerderblauw: '#0d1d30',
                donkerblauw: '#102c47',
                hemelblauw: '#206191',
                lichtblauw: '#2bc0d3',
                witblauw: '#aaced1',
            }
        },
        dark: {
            dark: true,
            colors: {
                primary: '#0d0d19',
                secondary: '#ffffff',
                blauwzwart: '#0d0d19',
                donkerderblauw: '#0d1d30',
                donkerblauw: '#102c47',
                hemelblauw: '#206191',
                lichtblauw: '#2bc0d3',
                witblauw: '#aaced1',
            }
        }
    }
  }
})