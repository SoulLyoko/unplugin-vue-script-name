import { createUnplugin } from "unplugin";
// import { parse, compileScript } from '@vue/compiler-sfc'
import { parseComponent } from "vue-template-compiler";
import { Options } from "./types";

const SETUP_COMPILED_STR = "export default __sfc_main";

export const unplugin = createUnplugin<Options>(() => ({
  name: "unplugin-vue-script-name",
  enforce: "pre",
  transformInclude(id) {
    return /\.vue$/.test(id) || /\.vue\?vue/.test(id);
  },
  transform(code, id) {
    const component = parseComponent(code);
    const { attrs, content } = component.script || {};
    const { setup, name, lang } = attrs || {};
    if (setup && name) {
      // before compile setup
      const scriptLang = lang ? `lang="${lang}"` : "";
      code = `<script ${scriptLang}>\nexport default { name: "${name}" };\n</script>\n${code}`;
    } else if (name && content?.includes(SETUP_COMPILED_STR)) {
      // after vue2-script-setup
      code = code.replace(SETUP_COMPILED_STR, `__sfc_main.name = "${name}";\n${SETUP_COMPILED_STR}`);
    }
    return {
      code,
      map: null
    };
    // const { descriptor } = parse(code);
    // const script = compileScript(descriptor, { id });
    // const { name } = script.attrs;
    // if (!(descriptor.scriptSetup && name)) return;
    // code = `<script>export default { name: "${name}" }</script>\n${code}`;
    // return { code };
  }
}));

export default unplugin;
