import React, { useState, useLayoutEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import PropTypes from 'prop-types'; // Import PropTypes

let chartData = {
    chart: {
        type: 'line'
      },
    title: {
        text: 'Winning Candidate Votes and Margins',
        align: 'left'
      },
    yAxis: {
      title: {
        text: 'Votes'
      }
    },
}
const LineChart = ({ data }) => {
  const [hoverData, setHoverData] = useState(null);
  const [chartOptions, setChartOptions] = useState({
    ...chartData,
    plotOptions: {
      series: {
        point: {
          events: {
            mouseOver: (e) => setHoverData(e.target.category)
          }
        }
      }
    }
  });

  useLayoutEffect(() => {
    if (data?.rows?.length > 1) {
        let categories = [];
        let margin = [];
        let totalVotes = [];
        let constituencyIndex = data.columns.findIndex(el => el === 'Constituency');
        let marginIndex = data.columns.findIndex(el => el === 'Margin');
        let totalVotesIndex = data.columns.findIndex(el => el === 'Total Votes');
        console.log({ constituencyIndex, marginIndex, totalVotesIndex })
        data.rows.map(el => {
            if (el.length > 1) {
                categories.push(el[constituencyIndex]);
                margin.push(Number(el[marginIndex]));
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
              }, {
                name: 'Margin',
                data: margin
              }],
           }
        })
    }
  }, [data])
  console.log({ chartOptions })


  return (
    <div>
        {chartOptions?.series &&
            <>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                />
                <h3>Hovering over {hoverData}</h3>
            </>
        }
    </div>
  );
}

LineChart.propTypes = {
    data: PropTypes.shape({
      columns: PropTypes.arrayOf(PropTypes.string).isRequired,
      rows: PropTypes.arrayOf(PropTypes.array).isRequired,
    }).isRequired,
  };

export default LineChart;
