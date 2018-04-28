<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <form class="float-right">
            <span class="mr-4" v-if="file">{{file.name}}</span>
            <label for="file-input" class="file-input-label">Upload CSV File
            </label>
            <input
              class="file-input"
              @change="fileUploaded"
              ref="file"
              id="file-input"
              type="file" />
            <!-- </input> -->
          </form>
        </div>
      </div>
      <div class="row" v-if="tableData.length">
        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <h4 class="card-title">CSVs Uploaded</h4>
              <p class="card-category">list of files already uploaded, click on chart button to view their treemap</p>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover"
                       :columns="tableColumns"
                       :data="tableData">
              </l-table>
            </div>
          </card>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import LTable from 'src/components/UIComponents/Table.vue'
  import { mapGetters } from 'vuex'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import Papa from 'papaparse'

  export default {
    components: {
      LTable,
      Card
    },
    data () {
      return {
        file: null,
        data: [],
        tableColumns: ['Name', 'Fields'],
      }
    },
    mounted () {
    },
    computed: {
        ...mapGetters([
        'chartData',
        'tableData'
        ]),
    },
    methods: {
      fileUploaded () {
        this.file = this.$refs.file.files[0]
        console.log(this.file.name)
        const fileToLoad = this.file
        const reader = new FileReader()
        Papa.parse(fileToLoad, {
          header: true,
          dynamicTyping: true,
          complete: (results, file) => {
            let csvData = {
              data: results.data,
              fields: results.meta.fields,
              name: file.name
            }
            this.$store.commit('ADD_NEW_CSV_DATA', csvData)
          },
          error (errors) {
            console.log('error', errors)
          }
        })
        reader.readAsText(fileToLoad)
      }
    }
  }
</script>
<style>
  .file-input-label {
    border: 1px solid blue;
    padding: 4px 10px;
    border-radius: 3px;
    cursor: pointer;
  }
  .file-input {
    display: none;
  }
</style>
