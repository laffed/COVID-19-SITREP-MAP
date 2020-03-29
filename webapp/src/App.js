import React, { useState, useEffect } from 'react';
import './App.css';
import Graph from './components/Graph';
import Select from 'react-select';

function App() {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState([])
  const [firstLabel, setFirstLable] = useState('US');
  const [secondLable, setSecondLable] = useState('ITALY');
  const [firstSelect, setFirstSelect] = useState(226);
  const [secondSelect, setSecondSelect] = useState(138);


  useEffect(() => {
    const runCall = async () => {
      let apiValue = await fetchData();
      const header = apiValue.split('\n').slice(0).map(line => (line.split(',')))[0].slice(4);

      const firstPrep = apiValue.split('\n').slice(0).map(line => (line.split(',')))[firstSelect]
      const secondPrep = apiValue.split('\n').slice(0).map(line => (line.split(',')))[secondSelect]

      const firstLbl = firstPrep[1].toUpperCase();
      const secondLbl = secondPrep[1].toUpperCase();

      const formatData = [];
      for (let i = 4; i < header.length; i++) {
        const newRow = {};
        newRow.name = header[i];
        newRow[firstLbl] = parseInt(firstPrep[i]);
        newRow[secondLbl] = parseInt(secondPrep[i]);
        formatData.push(newRow);
      }

      const countriesList = apiValue.split('\n').slice(1).map(line => (line.split(',').slice(0, 2)));
      const countriesArr = [];
      for (let i = 0; i < countriesList.length; i++) {
        countriesArr.push({ label: countriesList[i].reverse().join(' : '), value: i + 1 })
      }

      setFirstLable(firstLbl);
      setSecondLable(secondLbl);
      setOptions(countriesArr)
      setData(formatData);
      setIsLoading(false);
      return null;
    }

    const fetchData = async () => {
      const requestOption = {
        method: "GET",
        redirect: "follow"
      }

      const apiUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`

      try {
        const response = await fetch(apiUrl, requestOption);
        return response.ok ? response.text() : null
      } catch (err) {
        console.log(err);
        return null;
      }
    }
    runCall();
  }, [firstSelect, secondSelect])

  const firstInput = (input) => {
    setFirstSelect(input.value)
  }

  const secondInput = (input) => {
    setSecondSelect(input.value)
  }

  return (
    <div className="app-wrap">

      <h1>COVID-19 Confirmed Cases</h1>
      {isLoading ?
        <div>loading...</div> :
        <div className="content-wrap">
          <Graph data={data} label_1={firstLabel} label_2={secondLable} />
          <div className="selector-wrap">
            <Select options={options} onChange={firstInput} placeholder="US" />
            <Select options={options} onChange={secondInput} placeholder="ITALY" />
          </div>
        </div>
      }
    </div>
  );
}
export default App;
