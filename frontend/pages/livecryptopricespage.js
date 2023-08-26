import Head from 'next/head'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
      
    const scriptRef = useRef(null);

    useEffect(() => {
      const script = document.createElement('script');
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      script.async = true;
      script.innerHTML = `
      {
        "symbols": [
          [
            "BINANCE:BTCUSDT|1D"
          ],
          [
            "BINANCE:ETHUSD|1D"
          ],
          [
            "BINANCE:BNBUSDT|1D"
          ],
          [
            "BINANCE:BUSDUSDT|1D"
          ],
          [
            "BINANCE:SFPUSDT|1D"
          ],
          [
            "BINANCE:EOSUSDT|1D"
          ],
          [
            "BINANCE:SHIBUSDT|1D"
          ],
          [
            "BINANCE:TWTUSDT|1D"
          ],
          [
            "BINANCE:YFIUSDT|1D"
          ]
        ],
        "chartOnly": false,
        "width": "100%",
        "height": 600,
        "locale": "en",
        "colorTheme": "dark",
        "autosize": false,
        "showVolume": false,
        "showMA": false,
        "hideDateRanges": false,
        "hideMarketStatus": false,
        "hideSymbolLogo": false,
        "scalePosition": "right",
        "scaleMode": "Normal",
        "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
        "fontSize": "10",
        "noTimeScale": false,
        "valuesTracking": "1",
        "changeMode": "price-and-percent",
        "chartType": "area",
        "maLineColor": "#2962FF",
        "maLineWidth": 1,
        "maLength": 9,
        "lineWidth": 2,
        "lineType": 0,
        "dateRanges": [
          "1d|1",
          "1m|30",
          "3m|60",
          "12m|1D",
          "60m|1W",
          "all|1M"
        ]
      }
      `;
  
      scriptRef.current = script;
  
      const tradingViewContainer = document.getElementById('tradingview-widget');
  
      if (tradingViewContainer) {
        tradingViewContainer.appendChild(script);
      }
  
      return () => {
        if (scriptRef.current && scriptRef.current.parentNode) {
          scriptRef.current.parentNode.removeChild(scriptRef.current);
        }
      };
    }, []);
 
  return (
    <>
      <Head>
        <title>Live Crypto Prices</title>
        <meta name="description" content="Create voting app" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />
       </Head>
        <div className='maindiv py-[5%] bg-[#224]'>
       <div className='text-center text-[150%] text-[#fff] font-[600] mb-[3%]'>View live prices of your favorite cryptocurrencies</div>
         
       <div className="mb-[5%] mx-[5%]">
            <div className="mb-[5%]">
            <Helmet>
            <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js" async></script>
            </Helmet>
      <div id="tradingview-widget"></div>
            </div>
            </div>

        </div>
    </>
  )
}
