<template>
  <header>
    <div class="wrapper">
      <h1>Saved Functions</h1>
      <nav>
        <h2 v-if="isFetching" @click="test">Loading...</h2>
        <template v-else>
          <RouterLink
            v-for="func in functions"
            :to="'/run/' + func.id"
            :key="func.name"
          >
            {{ func.displayName }}
          </RouterLink>
        </template>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useFetch } from "@vueuse/core";

export default defineComponent({
  name: "App",
  setup() {
    const {
      isFetching,
      error,
      data: functions,
    } = useFetch("/api/functions").get().json();

    return {
      isFetching,
      error,
      functions,
    };
  },
});
</script>

<style lang="scss" scoped>
header {
  line-height: 1.5;
  border-inline-end: 1px solid #ffffff1c;
  padding-inline-end: 1rem;
  margin-inline-end: 1rem;

  // allow resize sidebar
  resize: horizontal;
  overflow: auto;

  nav {
    width: 100%;
    font-weight: bold;
    margin-block-start: 2rem;

    a {
      display: block;
      padding-inline: 0 1rem;
      border-bottom: 1px solid var(--color-border);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;

      &.router-link-exact-active,
      &:hover {
        color: var(--color-text-hover);
      }

      &.router-link-exact-active:hover {
        background-color: transparent;
      }
    }
  }
}
</style>
