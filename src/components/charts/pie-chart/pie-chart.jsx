import React, { useState, useCallback, useLayoutEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import PropTypes from 'prop-types'; // Import PropTypes

const PieChart = ({ data }) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Votes Distribution for GANAUR(28)'
    },
    series: [{
      name: 'Votes',
      colorByPoint: true,
      data: [{
        name: 'Winning Votes',
        y: 77248
      }, {
        name: 'Margin Votes',
        y: 35209
      }]
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

        // setChartOptions(prevData => {
        //    return {
        //     ...prevData,
        //     xAxis: {
        //         categories
        //     },
        //     series: [{
        //         name: 'Total Votes',
        //         data: totalVotes
        //       }],
        //    }
        // })
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

PieChart.propTypes = {
    data: PropTypes.shape({
      columns: PropTypes.arrayOf(PropTypes.string).isRequired,
      rows: PropTypes.arrayOf(PropTypes.array).isRequired,
    }).isRequired,
  };

export default PieChart;
