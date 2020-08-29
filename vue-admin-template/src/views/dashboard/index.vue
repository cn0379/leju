<template>
  <div class="dashboard-main">
    <el-card class="card" shadow="never">
      <!-- <el-row :gutter="20">
        <el-col :span="6">
          <el-card class="card-item" shadow="hover">
            <div class="pic-container">
              <div>
                <img class="picture" src="../../assets/icon/照片.png" alt />
              </div>
              <div>
                <p class="info">
                  用户新增
                  <span></span>个
                </p>
                <p class="info">
                  今日新增
                  <span></span>个
                </p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="card-item" shadow="hover">
            <div class="pic-container">
              <div>
                <img class="picture" src="../../assets/icon/照片.png" alt />
              </div>
              <div>
                <p class="info">
                  产品数量
                  <span></span>个
                </p>
                <p class="info">
                  今日新增
                  <span></span>个
                </p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="card-item" shadow="hover">
            <div class="pic-container">
              <div>
                <img class="picture" src="../../assets/icon/照片.png" alt />
              </div>
              <div>
                <p class="info">
                  订单数量
                  <span></span>个
                </p>
                <p class="info">
                  今日新增
                  <span></span>个
                </p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="card-item" shadow="hover">
            <div class="pic-container">
              <div>
                <img class="picture" src="../../assets/icon/照片.png" alt />
              </div>
              <div>
                <p class="info">
                  退单数量
                  <span></span>个
                </p>
                <p class="info">
                  今日新增
                  <span></span>个
                </p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row> -->
    </el-card>
    <div style="margin:50px;">
      <div id="main" style="width:100%;height:850px;" />
    </div>
  </div>
</template>
<script>
name: "dashboard";
import dashboardApi from "@/api/dashboard/index";
import echarts from "echarts";

export default {
  data() {
    return {
      dashboardData: {
        orderByDay: [],
      }, // 仪表板 数据
    };
  },
  created() {},
  mounted() {
    this.getDashboardData();
  },
  methods: {
    getDashboardData() {
      dashboardApi.dashboardInfo().then((res) => {
        this.dashboardData = res;
        console.log(res);
        this.drawLine();
      });
    },
    drawLine() {
      var myChart = echarts.init(document.getElementById("main"));
      const orderData = [];
      const timeData = [];
      this.dashboardData.orderByDay.forEach((ele) => {
        timeData.push(ele.date);
        orderData.push(ele.count);
      });
      myChart.setOption({
        backgroundColor: "#344b58",
        title: {
          text: "订单数量",
          x: "20",
          top: "20",
          textStyle: {
            color: "#fff",
            fontSize: "22",
          },
          subtextStyle: {
            color: "#90979c",
            fontSize: "16",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            textStyle: {
              color: "#fff",
            },
          },
        },
        grid: {
          left: "5%",
          right: "5%",
          borderWidth: 0,
          top: 150,
          bottom: 95,
          textStyle: {
            color: "#fff",
          },
        },
        legend: {
          x: "5%",
          top: "10%",
          textStyle: {
            color: "#90979c",
          },
          data: ["订单数量"],
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "#90979c",
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitArea: {
              show: false,
            },
            axisLabel: {
              interval: 3,
            },
            data: timeData,
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#90979c",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
            },
            splitArea: {
              show: false,
            },
          },
        ],
        dataZoom: [
          {
            show: true,
            height: 30,
            xAxisIndex: [0],
            bottom: 30,
            start: 10,
            end: 80,
            handleIcon:
              "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
            handleSize: "110%",
            handleStyle: {
              color: "#d3dee5",
            },
            textStyle: {
              color: "#fff",
            },
            borderColor: "#90979c",
          },
          {
            type: "inside",
            show: true,
            height: 15,
            start: 1,
            end: 35,
          },
        ],
        series: [
          {
            name: "订单数量",
            type: "bar",
            stack: "total",
            itemStyle: {
              normal: {
                color: "rgba(0,191,183,1)",
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: "top",
                  formatter(p) {
                    return p.value > 0 ? p.value : "";
                  },
                },
              },
            },
            data: orderData,
          },
        ],
      });
    },
  },
};
</script>

<style  lang='scss' scoped>
* {
  margin: 0;
  padding: 0;
}
.dashboard-main {
  width: 100%;
  height: calc(100vh);
  background-color: #08263a;
  overflow: hidden;
  .card {
    // margin: 30px;
    border: none;
    background-color: transparent;
    .card-item {
      height: 150px;
      border: none;
      background-color: #344B58;
    }
  }

  .pic-container {
    display: flex;
    .info {
      padding: 10px 0px 0px 60px;
      font-weight: 600;
      color: #fff;
    }
  }
  .picture {
    width: 50px;
    margin-top: 30px;
  }
  .echarts {
    margin: 50px;
  }
}
</style>
