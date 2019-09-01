<template>
  <v-app id="app">
    <v-container>
      <v-content>
        <p>Wanted font-family: Arial</p>
        <p>Current font-family: {{ fontFamily }}</p>
      </v-content>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class extends Vue {
  protected fontFamily: string = '';

  public mounted() {
    const app = document.getElementById('app');
    if (app) {
      const styles = getComputedStyle(app);
      this.fontFamily = styles.fontFamily;
    }
  }
}
</script>
