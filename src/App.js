import React from 'react';

// Sample dataset
const dataset = [
  { Alcohol: 1, Flavanoids: 2 },
  { Alcohol: 1, Flavanoids: 3 },
  { Alcohol: 2, Flavanoids: 4 },
  { Alcohol: 2, Flavanoids: 4 },
  { Alcohol: 3, Flavanoids: 5 },
  // ... add more data as needed
];

// Utility function to calculate the mean of an array
const calculateMean = (array) => {
  const sum = array.reduce((acc, val) => acc + val, 0);
  return sum / array.length;
};

// Utility function to calculate the median of an array
const calculateMedian = (array) => {
  const sortedArray = array.sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedArray.length / 2);
  if (sortedArray.length % 2 === 0) {
    return (sortedArray[middleIndex - 1] + sortedArray[middleIndex]) / 2;
  }
  return sortedArray[middleIndex];
};

// Utility function to calculate the mode of an array
const calculateMode = (array) => {
  const frequencyMap = {};
  let maxFrequency = 0;
  let modes = [];

  array.forEach((value) => {
    if (!frequencyMap[value]) {
      frequencyMap[value] = 0;
    }
    frequencyMap[value]++;
    if (frequencyMap[value] > maxFrequency) {
      maxFrequency = frequencyMap[value];
      modes = [value];
    } else if (frequencyMap[value] === maxFrequency) {
      modes.push(value);
    }
  });

  return modes;
};

const FlavanoidsStatsTable = () => {
  // Get unique classes from the dataset
  const classes = [...new Set(dataset.map((data) => data.Alcohol))];

  // Calculate class-wise mean, median, and mode of Flavanoids
  const statistics = classes.map((cls) => {
    const classData = dataset.filter((data) => data.Alcohol === cls);
    const flavanoidsValues = classData.map((data) => data.Flavanoids);
    const mean = calculateMean(flavanoidsValues);
    const median = calculateMedian(flavanoidsValues);
    const mode = calculateMode(flavanoidsValues);
    return { class: cls, mean, median, mode };
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Measure</th>
          {classes.map((cls) => (
            <th key={cls}>Class {cls}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Flavanoids Mean</td>
          {statistics.map((stat) => (
            <td key={stat.class}>{stat.mean}</td>
          ))}
        </tr>
        <tr>
          <td>Flavanoids Median</td>
          {statistics.map((stat) => (
            <td key={stat.class}>{stat.median}</td>
          ))}
        </tr>
        <tr>
          <td>Flavanoids Mode</td>
          {statistics.map((stat) => (
            <td key={stat.class}>{stat.mode.join(', ')}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default FlavanoidsStatsTable;
