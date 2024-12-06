'use client'

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ElementContainer } from '@/ui/elementContainer';
import formatNumber from '@/utils/formatNumber';
import { format, parseISO } from 'date-fns';

interface Metric {
  metric_name: string;
  color: string;
  timeserie: { date: string; value: number }[];
}

interface GraphProps {
  data: Metric[];
}

const SimpleChart = ({ data }: GraphProps) => {
  const transformedData = data[0].timeserie.map((_, index) => {
    const entry: any = { date: data[0].timeserie[index].date };
    data.forEach(metric => {
      entry[metric.metric_name] = metric.timeserie[index].value;
    });
    return entry;
  });

  const formatXAxis = (tickItem: string) => {
    const date = parseISO(tickItem);
    if(format(date, 'd') === '1') return format(date, 'MMM d');
    return format(date, 'd');
  };

  // Calculate the min and max values for the Y-axis
  const allValues = data.flatMap(metric => metric.timeserie.map(point => point.value));
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);

  // Generate 3 ticks between the min and max values
  const ticksY = [0, minValue, (minValue + maxValue) / 2, maxValue];

  // Determine the interval for X-axis ticks
  const dataLength = transformedData.length;
  let tickInterval = 0;
  if (dataLength > 7) {
    tickInterval = Math.ceil(dataLength / 7);
  }

  return (
    <ElementContainer className='pr-8 pb-4 pt-8'>
      <ResponsiveContainer width="100%" height={265}>
        <LineChart data={transformedData}>
          <XAxis 
            dataKey="date" 
            tickLine={false}
            axisLine={{ stroke: '#BABABA', strokeWidth: 1, shapeRendering: 'crispEdges' }}
            tick={{ fontSize: 12, fill: '#727272', textAnchor: 'start', dx: -10, dy: 5, fontWeight: 'bold' }}
            tickFormatter={formatXAxis}
            interval={tickInterval}
          />
          <YAxis
            dataKey="value"
            tickLine={false}
            axisLine={false}
            ticks={ticksY}
            tickFormatter={formatNumber}
            tick={{ fontSize: 12, fill: '#727272'}} // Custom styling for Y-axis ticks
          />
          <Tooltip />
          {data.map((metric, index) => (
            <Line
              key={metric.metric_name}
              type="linear" // Make the line more rounded
              dataKey={metric.metric_name}
              dot={false}
              stroke={metric.color} // Different colors for each line
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ElementContainer>
  );
}

export default SimpleChart;