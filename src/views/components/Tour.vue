<!--
 * @Author: ShawnPhang
 * @Date: 2024-04-04 03:05:45
 * @Description: 漫游导航
 * @LastEditors: ShawnPhang <https://m.palxp.cn>
 * @LastEditTime: 2024-04-05 05:31:01
-->
<template>
  <el-tour v-model="isShow">
    <el-tour-step :target="steps[0]?.$el" title="File Management">
      <div>Click the File menu to manage your designs, adjust page settings, and more.</div>
    </el-tour-step>
    <el-tour-step placement="right" :target="steps[1]?.$el" title="Left Toolbar" description="Here you can select templates to start designing, or drag text, images and other assets onto the canvas." />
    <el-tour-step placement="left" :target="steps[2]?.$el" title="Right Properties Panel" description="When you select an element on the canvas, its editing options appear here. You can also switch to the Layers panel." />
    <el-tour-step :target="steps[3]?.$el" title="Download" description="Click here to export your current design. Give it a try!" />
  </el-tour>
</template>

<script setup lang="ts">
import { ElTour, ElTourStep } from 'element-plus'
import { ref } from 'vue'

type TProps = {
  steps: any,
}

const props = withDefaults(defineProps<TProps>(), {
  steps: [],
})

const isShow = ref(false)

const open = () => {
  isShow.value = true
}

defineExpose({
  open
})
</script>
