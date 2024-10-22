import React, { useState, useCallback, useLayoutEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import PropTypes from 'prop-types'; // Import PropTypes

const ColumnChart = ({ data }) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
        type: 'column'
      },
      title: {
        text: 'Total Votes Per Constituency'
      },
      xAxis: {
        categories: ['GANAUR(28)', 'HISAR(52)', 'BAHADURGARH(64)']
      },
      yAxis: {
        title: {
          text: 'Total Votes'
        }
      },
      series: [{
        name: 'Total Votes',
        data: [77248, 49231, 73191]
      }]
  });

  useLayoutEffect(() => {
    if (data?.rows?.length > 1) {
        let categories = [];
        let totalVotes = [];
        let constituencyIndex = data.columns.findIndex(el => el === 'Constituency');
        let totalVotesIndex = data.columns.findIndex(el => el === 'Total Votes');
        data.rows.map(el => {
            if (el.length > 1) {
                categories.push(el[constituencyIndex]);
                totalVotes.push(Number(el[totalVotesIndex]));
            }
        })

        setChartOptions(prevData => {
           return {
            ...prevData,
            xAxis: {
                categories
            },
            series: [{
                name: 'Total Votes',
                data: totalVotes
              }],
           }
        })
    }
  }, [data])
  console.log({ chartOptions })
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
    </div>
  );
}

ColumnChart.propTypes = {
    data: PropTypes.shape({
      columns: PropTypes.arrayOf(PropTypes.string).isRequired,
      rows: PropTypes.arrayOf(PropTypes.array).isRequired,
    }).isRequired,
  };

export default ColumnChart;
