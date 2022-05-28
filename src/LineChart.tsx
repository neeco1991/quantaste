import { Histo } from '../interfaces/api-response';
import { Chart } from 'react-google-charts';

type Props = { data: Histo[] };

const options = {
  legend: { position: 'none' },
  vAxis: {
    textPosition: 'none',
    gridlines: {
      color: 'transparent',
    },
  },
  hAxis: {
    textPosition: 'none',
    gridlines: {
      color: 'transparent',
    },
  },
  series: {
    0: { color: 'red' },
  },
  enableInteractivity: false,
};

export const LineChart = ({ data }: Props) => {
  const formattedData: [string | number, string | number][] = data.map((d) => [
    d.time,
    +d.priceUsd,
  ]);
  formattedData.unshift(['time', 'value']);

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="100%"
      data={formattedData}
      options={{ ...options, ...getColor(data) }}
    />
  );
};

const getColor = (data: Histo[]) => {
  const lastIndex = data.length - 1;
  if (+data[0].priceUsd > +data[lastIndex].priceUsd) {
    return {
      series: {
        0: { color: 'red' },
      },
    };
  } else {
    return {
      series: {
        0: { color: 'green' },
      },
    };
  }
};
