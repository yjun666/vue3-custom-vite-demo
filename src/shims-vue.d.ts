declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'vue-giant-tree';
declare module '@form-create/ant-design-vue';
declare module 'html-docx-js/dist/html-docx';
declare module 'file-saver';
declare module 'crypto-js';
