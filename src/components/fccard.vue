<template>
  <div class="row">
    <div class="col-4" v-for="column in value" :key="column.id">
      <div class="card h-100 shadow-sm" style="width: 18rem;">
        <img :src="column.avatar" class="card-img-top" :alt="column.title">
        <div class="card-body text-center">
          <h5 class="card-title">{{column.title}}</h5>
          <p class="card-text text-left" :title="column.content">{{column.content}}</p>
          <a href="#" class="btn btn-sm btn-outline-primary">进入专栏</a>
        </div>
        <div class="card-footer">
          <p>{{column.footer}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
export interface Card {
  id: string;
  title: string;
  avatar: string;
  content: string;
  footer: string;
}
export default defineComponent({
  name: 'fccard',
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  setup: () => {
    return {}
  }
})
</script>
<style lang="css">
  img{
    width: 90px;
    height: 90px;
  }
</style>
