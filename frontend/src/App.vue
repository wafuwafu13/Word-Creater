<template>
  <v-app>
    <Header />
    <v-row>
      <v-col sm="4.5" class="ml-2">
        <h2 class="mb-2" align="center">HTML</h2>
        <v-textarea
          outlined
          rows=20
          v-model="html"
        >
        </v-textarea>
      </v-col>
      <v-col sm="1"  align="center">
        <v-btn 
          class="primary mb-3"
          @click="clickConversionBtn">
          変換
        </v-btn>
        <v-btn 
          class="primary"
          @click="clickSaveBtn">
          保存
        </v-btn>
      </v-col>
      <v-col sm="4.5" class="mr-2">
        <h2 class="mb-2" align="center">TEXT</h2>
        <v-textarea
          outlined
          rows=20
          v-model="text"
        >
        </v-textarea>
      </v-col>
    </v-row>
  </v-app>
</template>

<script lang="ts">
  import Vue from 'vue'
  import axios from 'axios'
  import Header from '@/components/Header.vue'
  
  Vue.config.productionTip = false
  
  export default Vue.extend({
    name: 'App',
  
    components: {
      Header,
    },
  
    data: () => ({
      html: '',
      text: '',
    }),
  
    methods: {
      clickConversionBtn () {
        this.text = this.html.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'')
      },
      clickSaveBtn () {
        console.log('send to backend')
        axios
          .get('http://localhost:3000/api/hello')
          .then(res => console.log(res))
      }
    }
  });
</script>
