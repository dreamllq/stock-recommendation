import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import prettierConfig from 'eslint-config-prettier'

export default [
  ...pluginVue.configs['flat/recommended'],
  ...defineConfigWithVueTs(vueTsConfigs.recommended),
  prettierConfig,
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
]
