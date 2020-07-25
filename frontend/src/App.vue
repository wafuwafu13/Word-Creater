<template>
  <v-app>
    <Header />
    <v-row>
      <v-col sm="4.5" class="ml-2">
        <h2 class="mb-2" align="center">HTML</h2>
        <v-textarea
          outlined
          rows=20
          v-model="documents"
          @click="clickHTMLArea"
        >
        </v-textarea>
      </v-col>
      <v-col sm="1"  align="center">
        <v-btn 
          class="primary"
          @click="clickConversionBtn">
          変換
        </v-btn>
      </v-col>
      <v-col sm="4.5" class="mr-2">
        <h2 class="mb-2" align="center">TEXT</h2>
        <v-textarea
          outlined
          rows=20
          v-model="documents"
          v-show="showText"
        >
        </v-textarea>
      </v-col>
    </v-row>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/Header.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Header,
  },

  data: () => ({
    documents: '',
    showText: false
  }),

  methods: {
    clickHTMLArea () {
      this.showText = false
    },
    clickConversionBtn () {
      this.showText = true
    }
  }
});
</script>
