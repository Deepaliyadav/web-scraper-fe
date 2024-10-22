import React, { useState } from 'react';
import axios from 'axios';

import style from './get-url.module.scss';
import { ColumnChart, LineChart, PieChart, StackedChart } from '../charts';

function GetUrl() {
  const [data, setData] = useState();
  const [isloading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('');

  const submitUrl = async () => {
    try {
      setIsLoading(true);
      // const result = await axios(`http://127.0.0.1:8000/scrapegovt?url=${encodeURIComponent(url)}`);
      const result = await axios(`https://python-fastapi-qyrd.onrender.com?url=${encodeURIComponent(url)}`);
      console.log({ result });
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };
  console.log({ data });

  return (
    <div className={style['container']}>
      <div className={style['heading']}>Enter URL</div>
      <div className={style['input-btn']}>
        <input
          placeholder='Enter website URL here..'
          className={style['url-input']}
          onChange={e => setUrl(e?.target?.value)}
        />
        <button
          className={style['btn']}
          disabled={isloading}
          onClick={submitUrl}
        >Submit</button>
      </div>
      <div className={style['loader']}>
        {
          isloading && <div className={style['heading']}>Loading....</div>
        }
      </div>
      {
        !isloading && data?.rows?.length > 0 &&
        <div>
          <div className={style['heading']}>Scraped Data</div>
          <table>
            <tr>
              {data?.columns?.length > 0 &&
                    data.columns.map(cell => {
                      return (
                        <th key={cell} >{cell}&nbsp;</th>
                      )
                    })
                   }
            </tr>
            {
              data.rows.map((el, i) => {
                return (
                  <tr key={i}>
                   {el?.length > 0 &&
                    el.map(cell => {
                      return (
                        <td key={cell} >{cell}&nbsp;</td>
                      )
                    })
                   }
                  </tr>
                )
              })
            }
          </table>
        <ColumnChart data={data} />ß
        <LineChart data={data} />
        <StackedChart data={data} />
        <PieChart data={data} />
        </div>
      }
    </div>
  )
}

export default GetUrl
