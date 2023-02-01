declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "js-cookie";
declare module "lodash";
declare module "vuex-persist";
declare module "vuex-module-decorators";
declare module "rxjs";
declare module "uuid";
declare module "xe-utils";
declare module "element-plus";
declare module "html-docx-js/dist/html-docx";
declare module "file-saver";
declare module "vue-i18n";
declare module "crypto-js";
declare module "moment";

