import { Box, Typography } from "@mui/material";
import React from "react";
import RevenueCard from "../components/RevenueCard";
import { GeneralBox } from "../styles/styledcomponents";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
  Legend,
  Label,
} from "recharts";
import { useGetOrdersRevenueQuery } from "../store/orderApi";
import { useEffect } from "react";
import { useState } from "react";

const Homepage = () => {
  const { data: revenue, isSuccess } = useGetOrdersRevenueQuery();
  const [dataForCard, setDataForCard] = useState();
  const [dataForChart, setDataForChart] = useState();

  const convertDataHandler = () => {
    let X = 0;
    let Y = 0;
    const date = new Date();
    const m = date.getMonth();

    revenue.revenueOfThisYear.forEach((item) => {
      X += item.total;
    });
    revenue.revenueOfLastYear.forEach((item) => {
      Y += item.total;
    });

    let M = revenue.revenueOfThisYear.find((item) => {
      return item._id === m + 1;
    });

    let LM;
    if (m === 0) {
      LM = revenue.revenueOfLastYear.find((item) => {
        return item._id === 12;
      });
    } else {
      LM = revenue.revenueOfThisYear.find((item) => {
        return item._id === m;
      });
    }
    setDataForCard({
      ThisYear: { profit: X, percent: ((X - Y) / Y).toFixed(3) },
      LastYear: Y,
      ThisM: {
        profit: M.total,
        percent: ((M.total - LM.total) / M.total).toFixed(3),
      },
      LastM: LM.total,
    });
  };

  const covertChartsDataHandler = () => {
    let X = [];

    for (let i = 1; i <= 12; i++) {
      let Y = {};
      let Z = revenue.revenueOfThisYear.find((item) => {
        return item._id === i;
      });
      X.push(Z);
    }
    setDataForChart(X);
  };

  useEffect(() => {
    isSuccess && convertDataHandler();
    isSuccess && covertChartsDataHandler();
  }, [isSuccess]);
  return (
    <GeneralBox>
      <Typography variant="h5" sx={{ marginTop: "2rem" }} textAlign="center">
        Charts & revenue
      </Typography>
      {dataForCard ? (
        <>
          <Box
            sx={{
              margin: "2rem",
              display: "flex",
              justifyContent: "start",
              gap: "2rem",
              flexWrap: "wrap",
              flexDirection: {
                xs: "column",
                md: "row",
              },
            }}
          >
            <RevenueCard title="去年收入" profit={dataForCard.LastYear} />
            <RevenueCard
              title="今年收入"
              profit={dataForCard.ThisYear.profit}
              percent={dataForCard.ThisYear.percent}
              grass={dataForCard.ThisYear.profit - dataForCard.LastYear}
            />
            <RevenueCard title="上月收入" profit={dataForCard.LastM} />
            <RevenueCard
              title="本月收入"
              profit={dataForCard.ThisM.profit}
              percent={dataForCard.ThisM.percent}
              grass={dataForCard.ThisM.profit - dataForCard.LastM}
            />
          </Box>

          <Box sx={{ margin: "2rem", overflowX: "auto" }}>
            <Box
              sx={{
                width: {
                  xs: "800px",
                  md: "100%",
                },
                height: "400px",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={dataForChart}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorPv"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    ></linearGradient>
                  </defs>
                  <XAxis dataKey="_id">
                    <Label value="月份" offset={0} position="insideBottom" />
                  </XAxis>
                  <YAxis>
                    <Label value="總計" angle="-90" position="insideLeft" />
                  </YAxis>
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </>
      ) : (
        <p>資料載入中</p>
      )}
    </GeneralBox>
  );
};

export default Homepage;
