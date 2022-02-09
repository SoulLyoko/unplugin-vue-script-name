import { createUnplugin } from "unplugin";
// import { parse, compileScript } from '@vue/compiler-sfc'
import { parseComponent } from "vue-template-compiler";
import { Options } from "./types";

export const unplugin = createUnplugin<Options>(() => ({
  name: "unplugin-vue-script-name",
  enforce: "pre",
  transformInclude(id) {
    return /\.vue$/.test(id) || /\.vue\?vue/.test(id);
  },
  transform(code, id) {
    var component = parseComponent(code);
    var { setup, name } = component.script?.attrs || {};
    if (!(setup && name)) return;
    code = `<script>export default { name: "${name}" }</script>\n${code}`;
    return { code };
    // const { descriptor } = parse(code);
    // const script = compileScript(descriptor, { id });
    // const { name } = script.attrs;
    // if (!(descriptor.scriptSetup && name)) return;
    // code = `<script>export default { name: "${name}" }</script>\n${code}`;
    // return { code };
  }
}));

export default unplugin;
