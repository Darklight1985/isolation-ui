import { useState, useEffect } from "react";
import {Select } from 'antd';
import Chartik from "./Chartik";
import Chart from 'chart.js/auto';

const Isolation = () => {
    const [isolation, setIsolation] = useState([]);
    const [chartData, setChartData] = useState([]);
   
    useEffect(() => {
        getIsolations();
     }, []);



     const handleChange = (value) => {
      console.log(value);
      let ids = null;
      if (value) {
        ids = ``
       for (let key in value) {
          ids = ids + `ids=` + value[key] + '&';
       }
     }
      fetchTemporalData(ids).then(res => {
      console.log(res);
      setChartData(res);
      });
    };

    const getIsolations = () => {
        fetchIsolation().then(res => {
            let filterIsolation = [];
    
            for (let key in res) {
                filterIsolation.push({value: res[key].id, label: res[key].mark})
            }
             setIsolation(filterIsolation);
            });
       };



       const fetchIsolation = async () =>  {
        return fetch('http://localhost:8080/isolation' , {
          method: 'GET'
         })
          .then((res) =>{
            if (res.status >= 400 || res.status < 200) {
              let resd = res.body.getReader();
              resd.read().then(({done, value}) => {
                  let stringOur = new TextDecoder().decode(value);
                  if (stringOur instanceof Object) {
                  let str = JSON.parse(stringOur).message;
                  window.stop();
                  } else { 
                    window.stop();    
              }})
              return {};
            } 
              else {       
              return res.json();
            }
          })
      }

      const fetchTemporalData = async (id) =>  {
        return fetch('http://localhost:8080/isolation/property?' + id , {
          method: 'GET'
         })
          .then((res) =>{
            if (res.status >= 400 || res.status < 200) {
              let resd = res.body.getReader();
              resd.read().then(({done, value}) => {
                  let stringOur = new TextDecoder().decode(value);
                  if (stringOur instanceof Object) {
                  let str = JSON.parse(stringOur).message;
                  window.stop();
                  } else { 
                    window.stop();    
              }})
              return {};
            } 
              else {       
              return res.json();
            }
          })
      }


    return(
        <div style={{width: 800}}>
        <div>Изоляция</div>
        <Select
        mode="multiple"
  //      defaultValue=''
        onChange={handleChange}
        style={{
          width: 220,
        }}
        options={isolation}
      />
      <Chartik chartData ={chartData}></Chartik>
      </div>
    )
}

export default Isolation;