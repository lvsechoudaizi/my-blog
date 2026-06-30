<script setup lang="ts">
import { ref, computed } from 'vue'

interface LogEntry {
  id: number
  time: string
  ip: string
  page: string
  device: string
  userAgent: string
}

const logs = ref<LogEntry[]>([
  { id: 1, time: '2026-06-29 17:30:22', ip: '192.168.1.105', page: '/', device: 'Chrome / macOS', userAgent: 'Mozilla/5.0' },
  { id: 2, time: '2026-06-29 17:25:10', ip: '10.0.0.42', page: '/posts/vue3-composition-api', device: 'Safari / iOS', userAgent: 'Mozilla/5.0' },
  { id: 3, time: '2026-06-29 16:58:44', ip: '223.104.63.12', page: '/projects', device: 'Chrome / Windows', userAgent: 'Mozilla/5.0' },
  { id: 4, time: '2026-06-29 16:42:08', ip: '180.158.92.3', page: '/posts/docker-compose', device: 'Firefox / Ubuntu', userAgent: 'Mozilla/5.0' },
  { id: 5, time: '2026-06-29 16:30:55', ip: '36.110.216.88', page: '/about', device: 'Chrome / Android', userAgent: 'Mozilla/5.0' },
  { id: 6, time: '2026-06-29 15:12:33', ip: '120.244.89.15', page: '/', device: 'Edge / Windows', userAgent: 'Mozilla/5.0' },
  { id: 7, time: '2026-06-29 14:55:20', ip: '171.217.65.44', page: '/posts/micro-frontend', device: 'Chrome / macOS', userAgent: 'Mozilla/5.0' },
  { id: 8, time: '2026-06-29 14:22:11', ip: '61.135.208.3', page: '/categories', device: 'Safari / macOS', userAgent: 'Mozilla/5.0' },
  { id: 9, time: '2026-06-29 13:48:07', ip: '202.96.134.88', page: '/tags', device: 'Chrome / Windows', userAgent: 'Mozilla/5.0' },
  { id: 10, time: '2026-06-29 12:15:44', ip: '58.246.142.9', page: '/posts/ai-coding', device: 'Chrome / macOS', userAgent: 'Mozilla/5.0' },
])

const filterPage = ref('')
const filterDate = ref('')

const filteredLogs = computed(() => {
  return logs.value.filter((log) => {
    const matchPage = !filterPage.value || log.page.includes(filterPage.value)
    const matchDate = !filterDate.value || log.time.startsWith(filterDate.value)
    return matchPage && matchDate
  })
})

function clearFilters() {
  filterPage.value = ''
  filterDate.value = ''
}
</script>

<template>
  <main class="page logs-page">
    <section class="card page-header">
      <div class="header-left">
        <p class="eyebrow">System</p>
        <h1>访问日志</h1>
        <p class="description">查看网站的访问记录（Mock 数据）</p>
      </div>
    </section>

    <section class="card filters-card">
      <div class="filter-row">
        <input
          v-model="filterPage"
          type="text"
          class="filter-input"
          placeholder="筛选访问页面..."
        />
        <input
          v-model="filterDate"
          type="text"
          class="filter-input date-input"
          placeholder="筛选日期（如：2026-06-29）"
        />
        <button type="button" class="secondary-button" @click="clearFilters">重置</button>
      </div>
    </section>

    <section class="card table-card">
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>访问时间</th>
              <th>IP 地址</th>
              <th>访问页面</th>
              <th>设备类型</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in filteredLogs" :key="log.id">
              <td class="time-cell">{{ log.time }}</td>
              <td class="ip-cell">{{ log.ip }}</td>
              <td class="page-cell">
                <code class="page-path">{{ log.page }}</code>
              </td>
              <td class="device-cell">{{ log.device }}</td>
            </tr>
            <tr v-if="filteredLogs.length === 0">
              <td colspan="4" class="empty-cell">暂无日志</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-footer">
        <span class="count-info">共 {{ filteredLogs.length }} 条记录</span>
      </div>
    </section>
  </main>
</template>

<style scoped lang="less">
@import '../styles/pages/logs.less';
</style>
