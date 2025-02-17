"use client";
import { Button, Form, Input } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { AppApiRequest } from "@/apiRequest";

type ScoreType = {
  sbd: string;
  toan: string;
  ngu_van: string;
  ngoai_ngu: string;
  vat_li: string;
  hoa_hoc: string;
  sinh_hoc: string;
  lich_su: string;
  dia_li: string;
  gdcd: string;
  ma_ngoai_ngu: string;
};

export default function Home() {
  const [form] = useForm();
  const [scores, setScores] = useState<ScoreType>();
  const [notFoundMsg, setNotFoundMsg] = useState(false)
  
  const handleSubmit = async () => {
    if (notFoundMsg) {
      setNotFoundMsg(false)
    }

    let sbd = form.getFieldValue("sbd");

    try {
      const response = await AppApiRequest.getScores(sbd);
      setScores(response.data);
    } catch (error) {
      setNotFoundMsg(true)
    }
  };

  const subjects = [
    { field: "toan", label: "Toán" },
    { field: "ngu_van", label: "Ngữ Văn" },
    { field: "ngoai_ngu", label: "Ngoại Ngữ" },
    { field: "vat_li", label: "Vật Lí" },
    { field: "hoa_hoc", label: "Hóa Học" },
    { field: "sinh_hoc", label: "Sinh Học" },
    { field: "lich_su", label: "Lịch Sử" },
    { field: "dia_li", label: "Địa Lí" },
    { field: "gdcd", label: "GDCD" },
  ];

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {/* Form đăng ký */}
        <div className="bg-white shadow-md p-6 rounded-md mb-6">
          <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
            User Registration
          </h1>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="flex flex-col md:flex-row gap-4 items-stretch"
          >
            <Form.Item
              name="sbd"
              className="flex-1"
              validateTrigger={[]}
              rules={[
                {
                  required: true,
                  message: "Please enter your registration",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "Invalid registration code",
                },
              ]}
            >
              <Input placeholder="Enter registration code" size="large" />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="whitespace-nowrap"
            >
              Submit
            </Button>
          </Form>
        </div>

        {/* Hiển thị kết quả */}
        {scores ? (
          <div className="bg-white shadow-lg p-6 rounded-md">
            <h2 className="font-bold text-2xl mb-4 text-center md:text-left">
              Detailed Scores
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Card Registration Code */}
              <div className="hidden md:flex w-auto p-8 aspect-square rounded-full bg-slate-300 flex-col items-center justify-center shadow-md">
                <span className="font-medium text-lg text-center">
                  Registration Code
                </span>
                <span className="text-3xl font-bold text-blue-600">
                  {scores.sbd}
                </span>
              </div>

              {/* Bảng điểm */}
              <div className="w-full overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-blue-400">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"
                      >
                        Môn Học
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"
                      >
                        Điểm
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subjects.map(({ field, label }) => {
                      const score = scores[field as keyof ScoreType];
                      if (score === null) return null;
                      return (
                        <tr key={field}>
                          <td className="px-6 py-4 whitespace-nowrap">{label}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{score}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : <div>
          {notFoundMsg && <p className="text-red-600 bg-red-100 border border-red-400 p-2 rounded-md">Registration not exitst</p>}

        </div>
      
      }
      </div>
    </main>
  );
}
