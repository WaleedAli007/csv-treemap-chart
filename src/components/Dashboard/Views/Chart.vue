<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <svg width="900" height="570"></svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as d3 from 'd3'
import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
          svg: null,
          width: null,
          height: null,
          fader: null,
          color: null,
          format: null,
          treemap: null,
          root: null,
          cell: null,
          timeout: null,

      }
    },
    computed: {
        ...mapGetters([
        'chartData'
        ]),
    },
    mounted () {
        console.log(this.chartData)
        let data = {
            keyword: 'apartments for rent in miami',
            searchVolume: 22200,
            cpc: 1.16,
            competition: 0.7
        }
        this.svg = d3.select('svg')
        this.width = +this.svg.attr('width'),
        this.height = +this.svg.attr('height')
        console.log(this.width)
        this.fader = (color) => { return  d3.interpolateRgb(color, '#fff')(0.2) }
        this.color = d3.scaleOrdinal(d3.schemeCategory10.map(this.fader))
        this.format = d3.format(',d')

        this.treemap = d3.treemap()
                            .tile(d3.treemapResquarify)
                            .size([this.width, this.height])
                            .round(true)
                            .paddingInner(1)
        
        this.root = d3.hierarchy(data)
                        .eachBefore((d) => { d.data.id = (d.parent ? d.parent.data.id + '.' : '') + d.data.keyword })
                        .sum(this.sumBySize)
                        .sort((a, b) => { return b.height - a.height || b.value - a.value })
        
        this.treemap(this.root)
        this.cell = this.svg.selectAll('g')
                            .data(this.root.leaves())
                            .enter().append('g')
                            .attr('transform', (d) => { return `translate(${d.x0},${d.y0})`})
        
        this.cell.append('rect')
                    .attr('id', (d) => { return d.data.id })
                    .attr('width', (d) => { return d.x1 - d.x0 })
                    .attr('height', (d) => { return d.y1 - d.y0 })
                    .attr('fill', (d) => { console.log(d); return this.color(d.data.id)})

        this.cell.append("clipPath")
            .attr('id', (d) => { return `clip-${d.data.id}` })
            .append('use')
            .attr('xlink:href', (d) => { return `# ${d.data.id}` })

        this.cell.append('text')
            .attr('clip-path', (d) => { return `url(#clip-${d.data.id})` })
            .selectAll('tspan')
            .data((d) => { return d.data.keyword.split(/(?=[A-Z][^A-Z])/g) })
            .enter().append('tspan')
            .attr('x', 4)
            .attr('y', (d, i) => { return 13 + i * 10 })
            .text((d) => { return d })

        this.cell.append('title')
            .text((d) => { return d.data.id + '\n' + this.format(d.value) });

        d3.selectAll("input")
            .data([this.sumBySize, this.sumByCount], function(d) { return d ? d.keyword : this.value; })
            .on('change', changed);

        this.timeout = d3.timeout(function() {
            d3.select("input[value=\"sumByCount\"]")
                .property("checked", true)
                .dispatch("change");
        }, 2000);

        function changed(sum) {
            timeout.stop();

            treemap(root.sum(sum));

            cell.transition()
                .duration(750)
                .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
            .select("rect")
                .attr("width", function(d) { return d.x1 - d.x0; })
                .attr("height", function(d) { return d.y1 - d.y0; });
        }
    },
    methods: {
        sumByCount(d) {
            return d.children ? 0 : 1
        },
        sumBySize(d) {
            return d.size
        }
    }
  }
</script>
<style>

</style>
