<template>
  <view class="container">
    <view class="header">
      <image class="plus" src="/static/assets/plus.png"/>
      <input class="new-todo" :value="input" placeholder="Anything here..." auto-focus @input="inputChangeHandle" @confirm="addTodoHandle"/>
    </view>
    <block v-if="todos.length > 0">
      <view class="todos">
        <!-- List items should get the class `completed` when marked as completed -->
        <view :class="item.completed ? 'item completed' : 'item'" v-for="(item, index) in todos" :key="index" @click="toggleTodoHandle" :data-index="index">
          <!-- completed: success, todo: circle -->
          <icon class="checkbox" :type="item.completed ? 'success' : 'circle'"/>
          <text class="name">{{ item.name }}</text>
          <icon class="remove" type="clear" size="16" @click.stop="removeTodoHandle" :data-index="index"/>
        </view>
      </view>
      <view class="footer">
        <text class="btn" @click="toggleAllHandle">Toggle all</text>
        <text v-if="leftCount > 0">{{ leftCount }} {{ leftCount === 1 ? 'item' : 'items' }} left</text>
        <text class="btn" v-if="todos.length > leftCount" @click="clearCompletedHandle">Clear completed</text>
      </view>
    </block>
    <block v-else>
      <view class="empty">
        <text class="title">Congratulations!</text>
        <text class="content">There's no more work left.</text>
      </view>
    </block>
  </view>
</template>

<script lang="ts" src="./index.ts"></script>

<style scoped>
@import './index.css';
</style>
