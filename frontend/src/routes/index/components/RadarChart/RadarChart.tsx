import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, LinearScale, Filler } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { useContextTheme } from 'providers/ProviderTheme';
import { IStandartizedJetConfig } from 'config/interfaces/IStandartizedJetConfig';
import Styles from 'routes/index/components/RadarChart/RadarChart.module.scss';

ChartJS.register(RadialLinearScale, PointElement, LineElement, LinearScale, Filler);

interface IRadarChartProps {
  standartizedJetStats: IStandartizedJetConfig;
}

const RadarChart = ({ standartizedJetStats }: IRadarChartProps) => {
  const { theme } = useContextTheme();
  const options = getOptions(theme);
  const data = getData(standartizedJetStats);

  return (
    <div className={Styles.wrapper}>
      <Radar data={data} options={options} />
    </div>
  );
};

function getOptions(theme: string) {
  const colorGrid = theme === 'dark' ? 'rgb(255, 255, 255, 0.25)' : 'rgb(0, 0, 0, 0.25)';
  const colorText = theme === 'dark' ? 'rgb(255, 255, 255, 0.5)' : 'rgb(0, 0, 0, 0.5)';
  const colorBgTicks = theme === 'dark' ? '#141c2f' : '#f5f8ff';

  return {
    responsive: true,
    color: '#fff',
    scales: {
      r: {
        angleLines: {
          display: true,
          color: colorGrid,
        },
        min: 0,
        max: 6,
        grid: {
          color: colorGrid,
        },
        ticks: {
          display: false,
          stepSize: 2,
          backdropColor: colorBgTicks,
          beginAtZero: false,
          font: {
            size: 18,
          },
        },
        pointLabels: {
          padding: 0,
          color: colorText,
          font: {
            size: 18,
          },
        },
      },
    },
  };
}

function getData(standartizedJetStats: IStandartizedJetConfig) {
  return {
    labels: ['Steering', 'Speed', 'Bullet speed', 'Bullet life-time', 'Size'],
    datasets: [
      {
        data: Object.values(standartizedJetStats),
        backgroundColor: 'rgb(0, 121, 254, 0.3)',
        borderColor: '#0079FE',
        borderWidth: 2,
      },
    ],
  };
}

export default RadarChart;
