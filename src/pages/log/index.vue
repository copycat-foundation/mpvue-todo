<template>
 <div class="container">
     <div class="logs" v-if="logs.length > 0">
       <div class="item" v-for="log in logs" :key="log.timestamp">
         <span class="name">Name: {{log.name}}</span>
         <span class="action">{{log.action}}</span>
         <span class="timestamp">[{{log.timestamp}}]</span>
       </div>
     </div>
 </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style scoped>
.logs {
  border: 1rpx solid #e0e0e0;
  border-radius: 10rpx;
  box-shadow: 0 0 5rpx #e0e0e0;
}

.item {
  padding: 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
  font-size: 30rpx;
  color: #888;
}

.item:last-child {
  border-bottom: 0;
}

.timestamp {
  display: block;
  margin-top: 20rpx;
}

.name {
  display: inline-block;
  width: 70%;
  color: #aa0;
}

.action {
  display: inline-block;
  width: 30%;
  color: #f40;
  text-align: right;
}

</style>
