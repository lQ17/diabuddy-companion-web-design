<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { planUserAddPumpBasalRateService, planUserGetTDD } from '@/api/plan'
import { useUserStore } from '@/stores'
import { showSuccessToast } from '@/components/vantComponents'
const userStore = useUserStore()
const onAdd = async () => {
  await planUserAddPumpBasalRateService(
    userStore.user.id,
    BasalArrResult.value[0], // 对应 00:00 - 02:30
    BasalArrResult.value[1], // 对应 03:00 - 08:30
    BasalArrResult.value[2], // 对应 09:00 - 11:30
    BasalArrResult.value[3], // 对应 12:00 - 15:30
    BasalArrResult.value[4], // 对应 16:00 - 19:30
    BasalArrResult.value[5] // 对应 20:00 - 23:30
  )
  showSuccessToast('保存成功')
}
const router = useRouter()
const onClickLeft = () => history.back()
const showHowToCompute = ref(false)
const showBasalPercentExplain = ref(false)
const showWaveExplain = ref(false)
const text = '注意！注意！注意！T1DM常需采用更多分段。本软件致力于帮助T1DM更好的控制血糖，故计算器默认使用6段法进行计算。'
const keywords = ['注意！注意！注意！', '6段法']

const userTDD = ref()
const basalPersent = ref()
const betaFactor = computed(() => {
  if (userTDD.value > 0 && basalPersent.value > 1 && basalPersent.value < 90) {
    return (userTDD.value * basalPersent.value * 0.01) / 24
  } else {
    return 0
  }
})
const BasalArrResult = computed(() => {
  if (betaFactor.value > 0) {
    return [
      (betaFactor.value * 0.6).toFixed(2),
      (betaFactor.value * 1.2).toFixed(2),
      betaFactor.value.toFixed(2),
      betaFactor.value.toFixed(2),
      (betaFactor.value * 1.1).toFixed(2),
      (betaFactor.value * 0.8).toFixed(2),
      (betaFactor.value * 23.6).toFixed(2)
    ]
  } else {
    return [1]
  }
})

const initTdd = async () => {
  const res = await planUserGetTDD(userStore.user.id)
  const tdd = res.data.data.tdd
  if (tdd != null) {
    showSuccessToast('已自动获取您的TDD数值')
    userTDD.value = tdd
  }
}

onMounted(() => {
  initTdd()
})
</script>
<template>
  <div class="page-container">
    <van-nav-bar title="基础率分段计算" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="warning-box">
      <div class="warning-font-box">佩戴胰岛素泵可以设置不同时间段的基础率，科学地设置基础率可以使血糖更加稳定</div>
    </div>
    <van-cell-group inset title="第一步：请输入每日胰岛素总量(TDD)">
      <van-field v-model="userTDD" type="number" placeholder="请输入每日胰岛素总量(TDD)" />
    </van-cell-group>
    <p id="to-compute-TDD" @click="router.push('/utils/TDD-calculation')">每日胰岛素总量(TDD)如何计算？</p>
    <van-cell-group inset>
      <template #title>
        <van-space>
          <div>第二步：请输入基础率占TDD的百分比</div>
          <div>
            <van-icon name="question-o" color="#1989fa" size="20" @click="showBasalPercentExplain = true" />
          </div>
        </van-space>
      </template>
      <van-field v-model="basalPersent" type="number" placeholder="单位：%" />
    </van-cell-group>
    <!-- 基础率占TDD的百分比解释 -->
    <div class="showBasalPercentExplain">
      <van-popup v-model:show="showBasalPercentExplain" round :style="{ padding: '40px' }">
        <template #default>
          <div class="showBasalPercentExplainTitle">基础率占TDD的百分比</div>
          <div class="showBasalPercentExplainDetail">
            40 ~
            44%：对胰岛素、运动、高碳水饮食敏感的儿童和成人，消瘦、饮食比较固定且常吃素淡饮食、活动量或运动量大的人，或在诊断初期仍具有部分胰岛功能的患者。
          </div>
          <p>&nbsp;</p>
          <div class="showBasalPercentExplainDetail">
            45 ~
            60%：适用于大部分人。有明显黎明高血糖现象、静息生活方式、肥胖或胰岛素抵抗的人、白天经常吃零食或饮食中油水较大的人。青少年生长发育期体内有较高的拮抗胰岛素的应激激素水平，也需要较高比例的基础率（60%）
          </div>
          <p>&nbsp;</p>
          <div class="showBasalPercentExplainDetail">*以上内容全部摘自《胰岛素泵治疗糖尿病第2版（马学毅）》</div>
        </template>
      </van-popup>
    </div>
    <!-- 双波方波解释 -->
    <div class="showWaveExplain">
      <van-popup v-model:show="showWaveExplain" round :style="{ padding: '40px' }">
        <template #default>
          <div class="showBasalPercentExplainTitle showWaveExplain">双波和方波</div>
          <div class="showBasalPercentExplainDetail showWaveExplain">"双波"和"方波"是两种不同的胰岛素输送模式，用于管理餐后血糖水平。</div>
          <p>&nbsp;</p>
          <div class="showBasalPercentExplainDetail showWaveExplain wavemain">方波输送：</div>
          <div class="showBasalPercentExplainDetail showWaveExplain">
            定义： 方波输送是指在一定时间内以均匀的速率输送一定量的胰岛素。这种输送方式类似于长时间内均匀地释放胰岛素。
          </div>
          <div class="showBasalPercentExplainDetail showWaveExplain">
            适用情况：方波输送通常用于消化较慢的食物，如高脂肪餐或大餐。因为这些食物导致血糖缓慢升高，需要更长时间的胰岛素作用来控制血糖。
          </div>
          <p>&nbsp;</p>
          <div class="showBasalPercentExplainDetail showWaveExplain wavemain">双波输送：</div>
          <div class="showBasalPercentExplainDetail showWaveExplain">
            定义： 双波输送结合了即刻释放和延时释放胰岛素的特点。一部分胰岛素立即释放，以应对餐后血糖的快速升高；另一部分则以方波形式延后释放。
          </div>
          <div class="showBasalPercentExplainDetail showWaveExplain">
            适用情况：适用于同时含有快速和慢速吸收碳水化合物的餐食，例如含有面食、果蔬和高脂肪食物的混合餐。
          </div>
          <p>&nbsp;</p>
          <div class="showBasalPercentExplainDetail">*以上内容全部摘自《胰岛素泵治疗糖尿病第2版（马学毅）》</div>
        </template>
      </van-popup>
    </div>
    <div class="compute-btn">
      <div class="result-box" v-if="BasalArrResult.length === 7">
        <div class="result-value-box">
          <p>分段如下:</p>
          <p>&nbsp;</p>
          <p>00:00 - 03:00: &nbsp;&nbsp;&nbsp;{{ BasalArrResult[0] }}U/H</p>
          <p>03:00 - 09:00: &nbsp;&nbsp;&nbsp;{{ BasalArrResult[1] }}U/H</p>
          <p>09:00 - 12:00: &nbsp;&nbsp;&nbsp;{{ BasalArrResult[2] }}U/H</p>
          <p>12:00 - 16:00: &nbsp;&nbsp;&nbsp;{{ BasalArrResult[3] }}U/H ± 0.1</p>
          <p>16:00 - 20:00: &nbsp;&nbsp;&nbsp;{{ BasalArrResult[4] }}U/H</p>
          <p>20:00 - 24:00: &nbsp;&nbsp;&nbsp;{{ BasalArrResult[5] }}U/H</p>
          <p>&nbsp;</p>
          <p>基础率总用量: &nbsp;&nbsp;&nbsp;{{ BasalArrResult[6] }} ± 0.4 U</p>
          <p>&nbsp;</p>
        </div>
        <div></div>
        <van-button type="primary" block round @click="onAdd()">保存至我的参数</van-button>
      </div>
      <van-row>
        <van-col span="7"></van-col>
        <van-col span="10">
          <div class="how-to-compute-msg" @click="showHowToCompute = true">计算公式是什么？</div>
        </van-col>
        <van-col span="7"></van-col>
      </van-row>
    </div>
    <!-- 如何计算 -->
    <div class="how-to-compute-box">
      <van-action-sheet v-model:show="showHowToCompute" title="碳水化合物系数(ICR)计算公式">
        <div class="content">
          <div class="step-box">
            <div id="msg-1">计算公式</div>
            <div id="msg-2">
              <div id="msg-2-2">
                <p>&nbsp; &nbsp; &nbsp; 基础输注率的时间段应根据患者的胰岛功能状态、血糖波动情况以及生活状况来设置。</p>
                <p>&nbsp;</p>
                <p>
                  &nbsp; &nbsp; &nbsp;
                  一般情况下，病情较稳定的T2DM患者或尚有一定残存胰岛功能的T1DM患者，可使用简单的1~2段法，将基础率进行24H平均分配，22：00~2：00下调10%~20%，后续根据患者血糖监测情况进行调整。
                </p>
                <p>&nbsp;</p>
                <p>
                  &nbsp; &nbsp; &nbsp;
                  在T1DM以及胰岛功能差、血糖波动大的T2DM患者中，可设置为3~6个时间段清晨以及傍晚常需要较高的基础率以应对“黎明现象”和睡前高血糖（也称之为“黄昏现象”），而夜间和凌晨基础率则较低。
                </p>
                <p>&nbsp; &nbsp; &nbsp;</p>
                <p>
                  &nbsp; &nbsp; &nbsp;
                  <van-highlight :keywords="keywords" :source-string="text" highlight-class="custom-class" />
                </p>
                <p>&nbsp; &nbsp; &nbsp;</p>
                <p>
                  &nbsp; &nbsp; &nbsp;6段法：全天胰岛素总量÷24得到常数β，则0：00~3：00基础率为0.6β，3：00~9：00基础率为1.2β，9：00~12：00
                  基础率为β，12：00~16：00基础率为β±0.1，16：00~20：00基础率为1.1β，20：00~24：00基础率为0.8β。
                </p>
              </div>
            </div>
          </div>
          <div class="cite-box">中国2型糖尿病防治指南（2020年版）（上）[J].中国实用内科杂志,2021,41(08):668-695.DOI:10.19538/j.nk2021080106.</div>
        </div>
      </van-action-sheet>
    </div>
    <div class="warning-box">
      <div class="warning-font-box">
        <p>注意：</p>
        <p>&nbsp;</p>
        <p>
          1. 设置基础率占TDD的百分比请参考说明
          <van-icon name="question-o" color="#1989fa" size="20" @click="showBasalPercentExplain = true" />
        </p>
        <p>&nbsp;</p>
        <p>2. 强烈建议佩戴动态血糖仪(CGM)来检测血糖波动曲线，对基础率时间段、时间段对应的基础率进行微调。</p>
        <p>&nbsp;</p>
        <p>
          3. 如果你存在餐后三小时血糖后升的问题，请将碳水替换高GI食物。若仍不奏效，请使用方波双波注射
          <van-icon name="question-o" color="#1989fa" size="20" @click="showWaveExplain = true" />
          替代餐前大剂量
        </p>
        <p>&nbsp;</p>
        <p>4. 早期泵可以使用临时率覆盖基础率以达到方波双波同样的效果</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wavemain {
  font-weight: bold;
}
.showBasalPercentExplainDetail {
  font-size: 15px;
}
.showBasalPercentExplainTitle {
  margin-top: -20px;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
}
.result-value-box {
  text-align: left;
  margin: 30px;
  padding-left: 30px;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-top: 10px;
  background-color: #b3efff;
  border-radius: 10px;
  font-size: 15px;
  font-weight: bold;
  color: #046b99;
}
.result-box {
  text-align: center;
}
.compute-btn {
  margin: 25px;
}
.cite-box {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: -20px;
  font-size: 10px;
}
#msg-1 {
  margin-left: 20px;
  margin-right: 20px;
  padding: 10px;
  font-weight: bold;
  /* background-color: #b3efff; */
}
#msg-2 {
  text-align: left;
  background-color: #b3efff;
  color: #046b99;
  display: flex; /* 使用Flex布局 */
  justify-content: center; /* 水平居中对齐 */
  align-items: center; /* 垂直居中对齐 */
  border-radius: 10px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 30px;
  margin-top: 0px;
  padding: 10px;
}
#msg-2-2 {
  font-size: 15px;
  font-weight: bold;
}
.how-to-compute-msg {
  font-size: 15px;
  margin-top: 15px;
  color: #1989fa;
  text-align: center;
}
#to-compute-TDD {
  margin-top: 10px;
  margin-left: 20px;
  font-size: 15px;
  color: #1989fa;
}
.warning-font-box {
  font-size: 15px;
  font-weight: bold;
}
.warning-box {
  text-align: left;
  background-color: #b3efff;
  color: #046b99;
  display: flex; /* 使用Flex布局 */
  justify-content: center; /* 水平居中对齐 */
  align-items: center; /* 垂直居中对齐 */
  border-radius: 10px;
  margin: 20px;
  padding: 10px;
}
.page-container {
  min-height: 100vh;
  background: #f6f7fb;
}
</style>
