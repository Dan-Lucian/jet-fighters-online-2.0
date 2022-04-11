import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  LinearScale,
  Filler,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

// shared hooks
import { useContextTheme } from '../../../../providers/ProviderTheme';

// styles
import styles from './ChartRadar.module.scss';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  LinearScale,
  Filler
);

const propTypes = {
  statsJet: PropTypes.object.isRequired,
};

const ChartRadar = ({ statsJet }) => {
  const { theme } = useContextTheme();

  const colorGrid =
    theme === 'dark' ? 'rgb(255, 255, 255, 0.25)' : 'rgb(0, 0, 0, 0.25)';

  const colorText =
    theme === 'dark' ? 'rgb(255, 255, 255, 0.5)' : 'rgb(0, 0, 0, 0.5)';

  const colorBgTicks = theme === 'dark' ? '#141c2f' : '#f5f8ff';

  const data = {
    labels: ['Steering', 'Speed', 'Bullet speed', 'Bullet life-time', 'Size'],
    datasets: [
      {
        data: Object.values(statsJet),
        backgroundColor: 'rgb(0, 121, 254, 0.3)',
        borderColor: '#0079FE',
        borderWidth: 2,
      },
    ],
  };

  const options = {
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

  return (
    <div className={styles.wrapperRadar}>
      <Radar data={data} options={options} className={styles.radar} />
    </div>
  );
};

ChartRadar.propTypes = propTypes;

export default ChartRadar;
