import { trpc } from "../../utils/trpc";
import Loader from "../shared/Loader";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const Overview = () => {
  const { data: total, isFetching } = trpc.transaction.totals.useQuery();
  const { data: categories } = trpc.category.list.useQuery();
  const { data: transactions } = trpc.transaction.list.useQuery();

  const makeArray = () => {
    let array3: any = [];
    categories?.categories.forEach((category) => {
      let totalAmount = 0;
      transactions?.transactions.forEach((transaction) => {
        if (transaction.category === category.name) {
          totalAmount += transaction.amount;
        }
      });
      array3.push({ category: category.name, amount: totalAmount });
    });

    return array3;
  };

  const flattedCategories =
    categories?.categories
      .flatMap((name) => name)
      .map((category) => category.name) ?? [];

  const labelColors = () => {
    let labelColorArray = [];
    for (let i = 0; i < flattedCategories?.length; i++) {
      labelColorArray.push(
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.3)`
      );
    }

    return labelColorArray;
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          padding: 20,
        },
      },
    },
  };

  const chartData: ChartData<"doughnut"> = {
    labels: flattedCategories,
    datasets: [
      {
        label: "Amount (€)",
        data: makeArray().map(
          (item: { category: string; amount: number }) => item.amount
        ),
        backgroundColor: labelColors(),
        borderColor: "transparent",
        borderWidth: 1,
      },
    ],
  };
  const textCenter = {
    id: "textCenter",
    beforeDatasetsDraw(chart: any, args: any, pluginOptions: any) {
      const { ctx } = chart;

      ctx.save();
      ctx.font = "bolder 20px sans-serif";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `Total Expenses: ${total}€`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    },
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
      <div>
        {total === 0 || undefined ? (
          <h3 className="text-center">No Transactions exist</h3>
        ) : (
          <Doughnut data={chartData} options={options} plugins={[textCenter]} />
        )}
      </div>
    </div>
  );
};

export default Overview;
