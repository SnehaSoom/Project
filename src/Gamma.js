import React from 'react';

// Sample dataset
const dataset = [
  { Alcohol: 1, Flavanoids: 2, Ash: 3, Hue: 4, Magnesium: 5 },
  { Alcohol: 1, Flavanoids: 3, Ash: 3, Hue: 4, Magnesium: 5 },
  { Alcohol: 2, Flavanoids: 4, Ash: 3, Hue: 4, Magnesium: 5 },
  { Alcohol: 2, Flavanoids: 4, Ash: 3, Hue: 4, Magnesium: 5 },
  { Alcohol: 3, Flavanoids: 5, Ash: 3, Hue: 4, Magnesium: 5 },
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

const calculateGammaStats = () => {
  // Calculate Gamma for each point in the dataset and store in a new property
  const datasetWithGamma = dataset.map((data) => {
    const gamma = (data.Ash * data.Hue) / data.Magnesium;
    return { ...data, Gamma: gamma };
  });

  // Get unique classes from the dataset
  const classes = [...new Set(dataset.map((data) => data.Alcohol))];

  // Calculate class-wise mean, median, and mode of Gamma
  const statistics = classes.map((cls) => {
    const classData = datasetWithGamma.filter((data) => data.Alcohol === cls);
    const gammaValues = classData.map((data) => data.Gamma);
    const mean = calculateMean(gammaValues);
    const median = calculateMedian(gammaValues);
    const mode = calculateMode(gammaValues);
    return {
      class: cls,
      mean: mean.toFixed(3),
      median: median.toFixed(3),
      mode: mode.map((value) => value.toFixed(3)),
    };
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
          <td>Gamma Mean</td>
          {statistics.map((stat) => (
            <td key={stat.class}>{stat.mean}</td>
          ))}
        </tr>
        <tr>
          <td>Gamma Median</td>
          {statistics.map((stat) => (
            <td key={stat.class}>{stat.median}</td>
          ))}
        </tr>
        <tr>
          <td>Gamma Mode</td>
          {statistics.map((stat) => (
            <td key={stat.class}>{stat.mode.join(', ')}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default calculateGammaStats;
