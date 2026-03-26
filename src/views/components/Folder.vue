<!--
 * @Author: ShawnPhang
 * @Date: 2024-04-03 19:15:21
 * @Description: File 
 * @LastEditors: ShawnPhang <https://m.palxp.cn>
 * @LastEditTime: 2024-04-10 07:16:00
-->
<template>
  <el-dropdown trigger="click" size="large" placement="bottom-start">
    <span class="el-dropdown-link">
      <slot />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item><div @click="$emit('select', 'newDesign')" class="item">New Design</div></el-dropdown-item>
        <el-dropdown-item @click="openPSD">Import File</el-dropdown-item>
        <el-dropdown-item @click="$emit('select', 'save')" divided>Save</el-dropdown-item>
        <el-dropdown-item @click="$emit('select', 'download')">ExportFile</el-dropdown-item>
        <el-dropdown-item disabled>Version History</el-dropdown-item>
        <el-dropdown-item disabled>Batch Templates</el-dropdown-item>
        <el-dropdown-item @click="$emit('select', 'changeLineGuides')" divided>Ruler & Guides</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
// import { ref, Ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElDropdown, ElDropdownItem, ElDropdownMenu } from 'element-plus'

const router = useRouter()

const openPSD = () => {
  window.open(router.resolve('/psd').href, '_blank')
}
</script>

<style lang="less" scoped>
.item {
  width: 224px;
}
</style>
