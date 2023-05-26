import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function getRandomColor(chislo) {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * (16))];
  }
  return color;
}


const Chartik = ({chartData}) => {

    let labelsGraph = [];
    let dataGraph = [];
    let dataGraphs = [];
  
   // let number = chartData.marks.length;
   // console.log(number);
   console.log(chartData.marks);


  if (chartData.marks) {
   // console.log(chartData.length.marks);
 // if (chartData != []) {
   let marki = chartData.marks;
   let cond = chartData.conductivities;
   console.log(marki.length);
    let index, len;
    for (index = 0, len = marki.length; index < len; ++index) {
      console.log(index);
      dataGraphs.push({data: cond[index], label: marki[index], borderColor: getRandomColor(index) ,fill: false, lineTension: 0.5})
    }
    labelsGraph = chartData.temperatures;
  //  for (let key in chartData) {
  //      dataGraph.push(chartData[key].conductivity[0])
   // }
  }
  console.log(dataGraphs);

  const lineChartData = {
    labels: labelsGraph,
    datasets: dataGraphs
  };

  return (
    <Line
      type="line"
      width={160}
      height={40}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Теплопроводность, Вт/м*К',
            fontSize: 20
          },
        },
      }}
      data={lineChartData}
    />
  );
};
export default Chartik;