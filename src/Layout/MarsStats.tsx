import getMarsStats from "@/lib/api/getMarsStats";
import { useQuery } from "@tanstack/react-query";
import { Chart } from "react-google-charts";

export default function MarsStats(): JSX.Element {
  const { data, error } = useQuery({
    queryKey: ["marsStats"],
    queryFn: getMarsStats,
  });

  if (error)
    return (
      <div className="flex items-center justify-center w-full h-full text-2xl font-poppins text-white font-bold">
        Wystąpił błąd
      </div>
    );

  const currentData = data?.data[data?.data.length - 1];
  console.log(currentData);

  return (
    <div className="flex w-full h-full flex-col items-center justify-center">
      <p className="text-center font-poppins font-bold text-xl mb-8">Dane Marsa</p>
      <Chart
        chartType="Gauge"
        data={[
          ["Temperatura", "Ciśnienie", "Wiatr"],
          [currentData?.temp_avg, currentData?.pressure, currentData?.wind],
        ]}
        className="w-full h-full"
        legendToggle={false}
        options={{
          gauge: {
            min: 0,
            max: 100,
            label: {
              format: function (value: any) {
                return value + "°";
              },
              show: true,
            },
            color: {
              pattern: ["#FF0000", "#FFFF00", "#00FF00"],
              threshold: {
                values: [30, 70],
              },
            },
          },
        }}
      />
    </div>
  );
}
