<template>
  <div class="edit">
    <div class="header">处在编辑模式中</div>
    <div class="content">
      <!-- <my-menu class="mymenu"></my-menu> -->
      <!-- <sub-Menu class="menu-sub"></sub-Menu> -->
      <div class="mymenu">
        <div
          v-for="(item, i) in arr_pages"
          :key="i"
          @click="changePage(item, i)"
        >
          <p
            :style="{
              color: currentidx == i ? 'white' : 'grey',
              'text-align': 'center',
            }"
          >
            {{ item.resourceJsonKey }}
          </p>
        </div>
      </div>
      <my-canvas class="diy"></my-canvas>
      <div class="price">
        <!-- <div class="bg-success" style="height: 100%"></div> -->
        <div v-show="bool_singleBtIn" class="div_center">
          <p class="info_title">绑定统计事件名称</p>
          <el-input v-model="currentInput" placeholder="请输入内容"></el-input>
        </div>
        <el-button class="exportbt" type="primary" @click="exportJson"
          >同步 >> resource.json</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import MyCanvas from "./MyCanvas.vue";
import * as YR from "@/YR.js";
import { Tool } from "@/YRUtils.js";
require("../lib/FileSaver.min.js");
//格式如下
// [
//   {p0_a0: "111",p0_a1: "2222"},
//   {p1_a0: "111",p1_a1: "2222"},
//   {p2_a0: "111",p2_a1: "2222"},
// ]

let saveInfo = [];
export default {
  data() {
    return {
      arr_pages: [],
      currentInput: "",
      currentidx: -1,
      currenteditid: "",
      bool_singleBtIn: false,
    };
  },
  mounted() {
    YR.Mediator.getInstance().add("Vue_EditUpdate", (e) => {
      this.arr_pages = e.data;
      //初始化saveInfo;
      this.initSaveInfo();
      this.$nextTick(() => {
        this.selectFirst();
      });
    });
    YR.Mediator.getInstance().add("Vue_EditUpdateSingleBT", (e) => {
      this.currenteditid = e.id;
      this.bool_singleBtIn = true;
      if (saveInfo[this.currentidx][e.id] != "") {
        this.currentInput = saveInfo[this.currentidx][e.id];
      } else {
        this.currentInput = "";
      }
    });
  },
  watch: {
    currentInput(val) {
      saveInfo[this.currentidx][this.currenteditid] = val;
    },
  },
  components: {
    MyCanvas,
  },
  methods: {
    changePage(p, idx) {
      this.currentPages = p;
      this.currentidx = idx;
      this.currentInput = "";
      this.bool_singleBtIn = false;
      YR.Mediator.getInstance().fire("PageEdit_In", { idx: p.targetName });
    },
    initSaveInfo() {
      // saveInfo
      for (let i = 0; i < this.arr_pages.length; i++) {
        let ob;
        let orginalOB = this.arr_pages[i].resourceJsonValue;
        console.log(orginalOB);
        for (let key in orginalOB) {
          if (orginalOB[key].hasOwnProperty("statist")) {
            if (!ob) {
              ob = {};
            }
            ob[key] = orginalOB[key].statist;
          }
        }
        if (!ob) {
          ob = {};
        }
        saveInfo.push(ob);
      }
      console.log("saveInfo:", saveInfo);
    },
    selectFirst() {
      console.log("this.arr_pages:", this.arr_pages);
      this.changePage(this.arr_pages[0], 0);
    },
    async exportJson(e) {
      for (let item of saveInfo) {
        for (let key in item) {
          let target = Tool.loopObject(window.resource, key);
          if (target) {
            target["statist"] = item[key];
          }
        }
      }
      // console.log(window.resource);
      // var content = JSON.stringify(window.resource);
      // var blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      // saveAs(blob, "resource.json");

      this.saveFile();
    },
    async saveFile(fileHandle) {
      const options = {
        types: [
          {
            description: "选择json文件",
            accept: {
              "text/plain": [".json"],
            },
          },
        ],
      };
      if (!fileHandle) {
        fileHandle = await window.showSaveFilePicker(options);
      }
      const writable = await fileHandle.createWritable();
      var str = JSON.stringify(window.resource).toString();
      console.log(str);
      await writable.write(str);
      await writable.close();
    },
  },
};
</script>
<style lang='scss' scoped>
@import "../style/mixin";

.edit {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  font-size: 20px;
  border-bottom: 1px solid rgb(206, 206, 206);
}

.content {
  height: 100%;
  flex: 1;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  width: 100%;
  background-color: grey;
}

.mymenu {
  flex: 0 1 100px;
  height: 100%;
  flex-direction: column;
  background-color: rgb(0, 0, 0);
  font-size: 0.5rem;
  color: white;
}

.menu-sub {
  flex: 0 1 220px;
  height: 100%;
  flex-direction: column;
  border-left: $commonBorder;
  border-right: $commonBorder;
}

.diy {
  flex: 1 1;
  height: 100%;
}
.price {
  position: relative;
  flex: 0 1 250px;
  background-color: white;
}
.div_center {
  display: flex;
  font-size: 0.7rem;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding: 5px;
  flex-wrap: wrap;
}
.info_title {
  font-size: 0.45rem;
  color: grey;
  padding: 10px;
}
.exportbt {
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  color: white;
}
</style>