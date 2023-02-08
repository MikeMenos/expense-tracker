import { trpc } from "../../utils/trpc";
import Loader from "../shared/Loader";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const Overview = () => {
  const { data, isFetching } = trpc.transaction.totals.useQuery();

  const chartData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  if (isFetching)
    return (
      <div className="rounded-xl bg-secondary px-10 py-8">
        <h2>Overview</h2>
        <Loader width={50} height={50} />
      </div>
    );
  return (
    <div className="rounded-xl bg-secondary px-10 py-8">
      <h2>Overview</h2>
      <div className="relative mt-8">
        <Doughnut data={chartData} />
        <h2 className="absolute left-[41%] top-[50%]">Total: {data}€</h2>
      </div>
    </div>
  );
};

export default Overview;
