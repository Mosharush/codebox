<template>
  <div class="about">
    <h1>
      {{
        isFetching || !data?.name
          ? "Loading..."
          : data.name + ": " + data.displayName
      }}
    </h1>
    <select name="currentLang" v-model="currentLang">
      <option
        v-for="lang in supportedLanguages"
        :value="lang"
        :key="lang"
        :selected="currentLang === lang && 'selected'"
      >
        {{ lang }}
      </option>
    </select>

    <br /><br />

    <codemirror
      v-model="code"
      placeholder="Code goes here..."
      :style="{ height: '400px' }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      :lang="currentLang"
      @ready="handleReady"
    />

    <button type="submit" @click.prevent="runCode">Run</button>
    <br />
    <template v-if="execOutput">
      <h2>Output {{ execOutput.status }}:</h2>
      <output>
        {{ execOutput.output || "*** No Output - add prints ***" }}
      </output>
    </template>
  </div>
</template>

<script>
import { defineComponent, ref, shallowRef, watchEffect, watch } from "vue";
import { useRoute } from "vue-router";
import { useFetch } from "@vueuse/core";
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { php } from "@codemirror/lang-php";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { generateCodeFromCtx } from "@c/codeplate";

export default defineComponent({
  components: {
    Codemirror,
  },
  setup() {
    const $route = useRoute();
    const currentLang = ref("PHP");
    const code = ref(`Loading...`);
    const execOutput = ref(null);
    const functionUrl = ref("/api/functions/" + $route.params.id);
    const { isFetching, error, data } = useFetch(functionUrl, {
      refetch: true,
    })
      .get()
      .json();

    watch($route, () => {
      functionUrl.value = "/api/functions/" + $route.params.id;
      code.value = generateCodeFromCtx(currentLang.value, data?._value);
    });
    const { data: languages } = useFetch("/api/langs").get().json();

    const supportedLanguages = ref([]);
    watch(languages, (newVal) => {
      supportedLanguages.value = Object.values(newVal).map(
        (l) => l.displayName
      );
      currentLang.value = supportedLanguages.value[0];
    });
    watch([currentLang, data], () => {
      code.value = generateCodeFromCtx(currentLang.value, data?._value);
    });

    const extensions = [
      javascript(),
      php(),
      python(),
      oneDark, // default theme for editor
    ];

    // Codemirror EditorView instance ref
    const view = shallowRef();
    const handleReady = (payload) => {
      view.value = payload.view;
    };

    const runCode = async () => {
      const currentLangName =
        languages._value[
          Object.keys(languages._value).find(
            (key) => languages._value[key].displayName === currentLang.value
          )
        ]?.name;
      const { data } = await useFetch("/api/langs/" + currentLangName)
        .post({
          code: code.value,
        })
        .json();

      execOutput.value = data._value;
    };

    return {
      languages,
      isFetching,
      error,
      data,
      code,
      extensions,
      handleReady,
      supportedLanguages,
      currentLang,
      runCode,
      execOutput,
    };
  },
});
</script>

<style scoped>
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
