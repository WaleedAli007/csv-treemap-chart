<template>
  <table class="table">
    <thead>
      <slot name="columns">
        <th v-for="column in columns" :key="column">{{column}}</th>
      </slot>
    </thead>
    <tbody>
    <tr v-for="(item, index) in data" :key="index">
      <slot :row="item">
        <td v-for="column in columns" :key="column" v-if="hasValue(item, column)">
          <pre v-if="typeof item === 'object'">{{itemValue(item, column)}}</pre>
          <template v-else>{{itemValue(item, column)}}</template>
        </td>
        <td v-if="actions">
          <div class="font-icon-detail">
            <a class="btn icon-btn" @click="viewChart(item, index)"><i class="nc-icon nc-chart-pie-35"></i></a>
          </div>
        </td>
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    name: 'l-table',
    props: {
      columns: Array,
      data: Array,
      actions: Boolean
    },
    methods: {
      hasValue (item, column) {
        return item[column.toLowerCase()] !== 'undefined'
      },
      itemValue (item, column) {
        return item[column.toLowerCase()]
      },
      viewChart (item, index) {
        this.$store.dispatch('VIEW_CHART', index)
        this.$emit('onChartView')
      }
    }
  }
</script>
<style>
</style>
