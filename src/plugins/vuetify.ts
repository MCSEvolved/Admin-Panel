import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
        light: {
            dark: false,
            colors: {
                primary: '#0d0d19',
                secondary: '#ffffff',
                donkerblauw: '#102c47'
            }
        },
        dark: {
            dark: true,
            colors: {
                primary: '#0d0d19',
                secondary: '#ffffff',
                donkerblauw: '#102c47'
            }
        }
    }
  }
})