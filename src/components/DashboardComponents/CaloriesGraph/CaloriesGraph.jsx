import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {
  Overflow,
  CaloriesAverageNumber,
  CaloriesAverageTitle,
  CaloriesHeader,
  CaloriesHeadingWrapper,
  CaloriesSectionhWrapper,
  СaloriesGraphWrapper,
  ScrollerWrapper,
  HeaderData,
} from './CaloriesGraph.styled';
import { useState, useEffect } from 'react';
import { getMonthlyStatistics } from '../../../redux/operations';
import { useDispatch } from 'react-redux';

export const CaloriesGraph = ({ month }) => {
  const [dataOfUser, setDataOfUser] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (month !== null) {
      const fetchData = async (month) => {
        try {
          const data = await dispatch(getMonthlyStatistics(month));
          setDataOfUser(data.payload);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData(month);
    }
  }, [month, dispatch]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  const numberOfDaysInTheMonth = (month) => {
    let monthNumberTested;

    if (month !== new Date().getMonth()) {
      monthNumberTested = new Date().getDate();
    } else {
      monthNumberTested = new Date(2023, month, 0).getDate();
    }
    const daysArray = Array.from({ length: monthNumberTested }, (_, index) =>
      (index + 1).toString()
    );
    return daysArray;
  };

  const dataCap = (numberOfDay) => {
    if (Object.keys(dataOfUser).length) {
      const foundItem = dataOfUser.callPerDay.find(
        (el) => numberOfDay === el.day.toString()
      );
      if (foundItem) {
        return foundItem.calories;
      } else {
        return 0;
      }
    }
    return 0;
  };

  const labels = numberOfDaysInTheMonth(month);

  const arrayOfGoods = labels.map((el) => dataCap(el));

  const maxNumber = Math.max(...arrayOfGoods);

  const arrayOfGraphData = () => {
    return arrayOfGoods;
  };

  const maxOnGraph = () => {
    const defaultMinimum = 3000;
    if (maxNumber < defaultMinimum) {
      return defaultMinimum;
    }
    const roundedNumber = Math.ceil(maxNumber / 1000) * 1000;
    return roundedNumber;
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: maxOnGraph(),
        grid: {
          color: '#292928',
        },
        gridLines: {
          display: false,
          color: '#B6B6B6',
        },
        ticks: {
          stepSize: 1000,
          color: '#B6B6B6',
          callback: function (value) {
            if (String(value).length === 1) {
              return value;
            }
            return String(value / 1000) + `K`;
          },
        },
      },
      x: {
        grid: {
          color: '#292928',
        },
        ticks: {
          color: '#B6B6B6',
        },
        scales: {
          x: {
            min: 0,
            max: 100,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        cornerRadius: 8,
        caretSize: 0,
        padding: 10,
        borderColor: 'rgba(227, 255, 168, 0.1)',
        borderWidth: 3,
        backgroundColor: '#0f0f0f',
        titleFont: {
          weight: 'bold',
          size: 32,
          color: 'white',
        },
        displayColors: false,
        yAlign: 'bottom',
        xAlign: 'auto',
        bodyFont: {
          size: 32,
        },
        footerFont: {
          size: 16,
        },
        footerAlign: 'center',
        labelAlign: 'center',
        callbacks: {
          title: () => null,
          label: (context) => context.raw,
          footer: () => 'calories',
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Calories',
        fill: false,
        showLine: true,
        borderColor: '#e3ffa8',
        borderWidth: 1,
        tension: 0.4,
        pointRadius: 0,
        pointBorderColor: '#e3ffa8',
        pointHoverRadius: 3,
        pointHitRadius: 12,
        pointBackgroundColor: '#e3ffa8',
        data: arrayOfGraphData(),
      },
    ],
  };

  return (
    <CaloriesSectionhWrapper>
      <CaloriesHeadingWrapper>
        <CaloriesHeader>Calories</CaloriesHeader>
        {dataOfUser.avgCalories ? (
          <HeaderData>
            <CaloriesAverageTitle>Average value:</CaloriesAverageTitle>
            <CaloriesAverageNumber>
              {dataOfUser.avgCalories.toFixed(0)}cal
            </CaloriesAverageNumber>
          </HeaderData>
        ) : (
          <HeaderData>
            <CaloriesAverageTitle>Average value:</CaloriesAverageTitle>
            <CaloriesAverageNumber>no added data yet</CaloriesAverageNumber>
          </HeaderData>
        )}
      </CaloriesHeadingWrapper>
      <ScrollerWrapper>
        <Overflow>
          <СaloriesGraphWrapper>
            <Line options={options} data={data} />
          </СaloriesGraphWrapper>
        </Overflow>
      </ScrollerWrapper>
    </CaloriesSectionhWrapper>
  );
};
