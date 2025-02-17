"use client";
import { AppApiRequest } from "@/apiRequest";
import { ChartDisplay } from "@/components/charts/barchar";
import { Select, Table } from "antd";
import { useEffect, useState } from "react";

type TopScore = {
  sbd: string;
  score: string;
};

interface IDataResponse {
  distribution: {
    average: string;
    total: string;
    "0-4": string;
    "4-6": string;
    "6-8": string;
    "8-10": string;
  };
  top10: TopScore[];
}

export default function Reports() {
  const [subject, setSubject] = useState("toan");
  const [chartType, setChartType] = useState("bar");
  const [data, setData] = useState<IDataResponse>();
  const [loading, setLoading] = useState(false);

  const subjects = [
    { value: "toan", label: "Toán" },
    { value: "ngu_van", label: "Ngữ Văn" },
    { value: "ngoai_ngu", label: "Ngoại Ngữ" },
    { value: "vat_li", label: "Vật Lí" },
    { value: "hoa_hoc", label: "Hóa Học" },
    { value: "sinh_hoc", label: "Sinh Học" },
    { value: "lich_su", label: "Lịch Sử" },
    { value: "dia_li", label: "Địa Lí" },
    { value: "gdcd", label: "GDCD" },
  ];

  const chartTypes = [
    { value: "bar", label: "Bar Chart" },
    { value: "line", label: "Line Chart" },
    { value: "pie", label: "Pie Chart" },
  ];

  const handleSubjectChange = (value: string) => {
    setSubject(value);
  };

  const handleChartTypeChange = (value: string) => {
    setChartType(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await AppApiRequest.getStatistics(subject);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subject]);

  const { average, total, ...chartData } = data?.distribution || {};
  const top10 = data?.top10 || [];

  const columns = [
    {
      title: "Registration",
      dataIndex: "sbd",
      key: "sbd",
      width: "50%",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      width: "35%",
      render: (score: string) => Number(score).toFixed(2),
    },
  ];

  return (
    <>
      <div className="bg-white shadow p-4 mb-3">
        <p className="mb-2 text-lg font-semibold">Phổ điểm theo môn thi</p>
        <div className="flex flex-wrap gap-2">
          <Select
            value={subject}
            style={{ width: 120 }}
            onChange={handleSubjectChange}
            options={subjects}
          />
          <Select
            value={chartType}
            style={{ width: 150 }}
            onChange={handleChartTypeChange}
            options={chartTypes}
          />
        </div>
      </div>

      <div className="bg-white shadow-lg p-4">
        <p className="relative lg:w-1/4 md:w-1/3 p-2 mb-3 text-lg uppercase bg-blue-600 text-white after:content-[''] after:absolute after:top-1/2 after:right-[-16px] after:-translate-y-1/2 after:w-0 after:h-0 after:border-t-[8px] after:border-b-[8px] after:border-l-[16px] after:border-t-transparent after:border-b-transparent after:border-l-blue-600">
          Phổ điểm {subject}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <div className="w-full sm:w-1/3 p-4 rounded flex flex-col text-center border shadow bg-white">
            <p className="text-lg">Average</p>
            <span className="text-lg font-medium text-blue-700">
              {average ? Number(average).toFixed(4) : "--"}
            </span>
          </div>
          <div className="w-full sm:w-1/3 p-4 rounded flex flex-col text-center border shadow bg-white">
            <p className="text-lg">Total student</p>
            <span className="text-lg font-medium text-blue-700">
              {total || "--"}
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <ChartDisplay
              chartData={chartData}
              chartType={chartType}
              subject={subject}
            />
          </div>
          {top10.length > 0 && (
            <div className="w-full lg:w-1/2">
              <h2 className="text-xl font-semibold mb-4">
                Top 10 điểm cao nhất của {subject.toUpperCase()}
              </h2>
              <Table
                dataSource={top10}
                columns={columns}
                loading={loading}
                rowKey="sbd"
                pagination={false}
                scroll={{ x: true }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
