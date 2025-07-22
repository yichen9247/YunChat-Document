import './style.css';
import DefaultTheme from 'vitepress/theme';
import { Underline } from '@theojs/lumen'
import '@theojs/lumen/style'

export default {
  extends: DefaultTheme,
  enhanceApp: ({ app }) => {
    app.component('Home', Underline)
  } 
}