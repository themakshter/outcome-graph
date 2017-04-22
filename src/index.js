'use strict';

var Chart = require('chart.js');
var sessionsConverter = require('./sessionsConverter.js')();

function getOutcomeGraph(div, title, data) {
  var chartConfig = getConfig(data, title);
  return new Chart(document.getElementById(div), chartConfig);
}

function getConfig(data, title) {
  return {
    type: 'radar',
    data: sessionsConverter.getChartJSConvertedData(data),
    options: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: title
      },
      scale: {
        ticks: {
          beginAtZero: true
        }
      },
      tooltips: {
        enabled: true,
        callbacks: {
          label: function label(tooltipItem, chartData) {
            var datasetLabel = chartData.datasets[tooltipItem.datasetIndex].label || '';
            // This will be the tooltip.body
            return datasetLabel + ' : ' + tooltipItem.yLabel + ' : ' + chartData.datasets[tooltipItem.datasetIndex].notes[tooltipItem.index];
          }
        }
      }
    }
  };
}

module.exports.getOutcomeGraph = getOutcomeGraph;
