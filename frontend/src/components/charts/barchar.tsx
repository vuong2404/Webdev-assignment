"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface ChartDisplayProps {
  chartData: { [key: string]: string } | undefined;
  chartType: string;
  subject: string;
}

export function ChartDisplay({ chartData, chartType, subject }: ChartDisplayProps) {
  if (!chartData) return null;

  // Chuyển các key (ví dụ: "0-4", "4-6",...) thành mảng label
  const labels = Object.keys(chartData);
  // Chuyển đổi giá trị string sang number
  const dataValues = labels.map((label) => Number(chartData[label]));

  const subjectsDict: Record<string, string> = {
    toan: "Toán",
    ngu_van: "Ngữ Văn",
    ngoai_ngu: "Ngoại Ngữ",
    vat_li: "Vật Lí",
    hoa_hoc: "Hóa Học",
    sinh_hoc: "Sinh Học",
    lich_su: "Lịch Sử",
    dia_li: "Địa Lí",
    gdcd: "GDCD",
  };

  // Ép kiểu subject để lấy tên môn học
  const subjectName =
    subjectsDict[subject as keyof typeof subjectsDict] || subject;

  // Cấu hình dữ liệu cho biểu đồ
  const data = {
    labels,
    datasets: [
      {
        label: `Phân phối điểm của ${subjectName}`,
        data: dataValues,
        backgroundColor: [
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: `Biểu đồ phân phối điểm - ${subjectName.toUpperCase()}`,
      },
    },
  };

  // Trả về biểu đồ dựa trên chartType
  if (chartType === "bar") {
    return <Bar data={data} options={options} />;
  } else if (chartType === "line") {
    return <Line data={data} options={options} />;
  } else if (chartType === "pie") {
    return <Pie data={data} options={options} />;
  } else {
    return null;
  }
}
