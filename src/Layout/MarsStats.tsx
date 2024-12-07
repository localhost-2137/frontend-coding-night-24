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

  return (
    <div className="flex w-full h-full flex-col items-center justify-center">
      <p className="text-center font-poppins font-bold text-xl mb-8">
        Dane Marsa
      </p>
      <Chart
        chartType="Gauge"
        data={[
          ["Temperatura", "Ciśnienie", "Wiatr"],
          [currentData?.temp_avg, currentData?.pressure, currentData?.wind],
        ]}
        className="w-full"
        legendToggle={false}
        options={{
          width: 300,
          height: 120,
          redFrom: 90,
          redTo: 100,
          yellowFrom: 75,
          yellowTo: 90,
          minorTicks: 5,
        }}
      />
    </div>
  );
}
