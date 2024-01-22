/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue"
  const components: DefineComponent
  export default components
}

declare module '@wangeditor/editor-for-vue';

