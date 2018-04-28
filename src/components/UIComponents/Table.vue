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
      data: Array
    },
    methods: {
      hasValue (item, column) {
        return item[column.toLowerCase()] !== 'undefined'
      },
      itemValue (item, column) {
        console.log(item, typeof item)
        return item[column.toLowerCase()]
      }
    }
  }
</script>
<style>
</style>
