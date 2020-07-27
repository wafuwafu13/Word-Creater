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
    <v-row>
      <v-col cols="4" align="center">
        <v-btn 
          class="primary"
          large
          @click="clickConversionBtn">
          変換
        </v-btn>
      </v-col>
      <v-col cols="4" align="center">
        <v-dialog v-model="saveDialog" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              large
              v-bind="attrs"
              v-on="on"
              :disabled="checkText"
            >
              保存
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              TEXTを保存する
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field label="ファイル名" v-model="saveFilename" required></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" :disabled="this.saveFilename == ''" @click="clickSaveBtn">実行</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col cols="4" align="center">
        <v-dialog v-model="createDialog" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              large
              v-bind="attrs"
              v-on="on"
              @click="clickCreateBtn"
            >
              作成
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              Wordファイルを作成する
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-select 
                      :items="filenames"
                      v-model="createFilename">
                    </v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" :disabled="this.createFilename == ''" @click="clickStartCreateBtn">実行</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      saveDialog: false,
      createDialog: false,
      saveFilename: '',
      filenames: [],
      createFilename: '',
    }),

    computed: {
      checkText () {
        return this.text === ''
      }
    },

    methods: {
      clickConversionBtn () {
        this.text = this.html.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'')
      },
      clickSaveBtn () {
        console.log('pushed save button')
        this.saveDialog = false

        axios
          .get('http://localhost:3000/' + this.saveFilename + '/' + this.text)
          .then(res => console.log(res))
          .catch(error => {
            console.log('error occurs in axios ' + error)
          })
      },
      clickCreateBtn () {
        console.log('pushed create button')
        axios
          .get('http://localhost:3000/filenames')
          .then(res => {
            console.log('↓response from server')
            console.log(res.data)
            for (let i = 0; i < res.data.length; i++) {
              this.filenames.push(res.data[i].name)
            }
          })
          .catch(error => {
            console.log('error occurs in axions ' + error)
          })
      },
      clickStartCreateBtn () {
        this.createDialog = false
        axios
          .get('http://localhost:3000/word/' + this.createFilename)
          .then(res => console.log(res))
          .catch(error => {
            console.log('error occurs in axios ' + error)
          })
      }
    }
  });
</script>
