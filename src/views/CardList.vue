<template>
  <div class='container'>
    <fccard :value='pageList'></fccard>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import fccard from '../components/fccard.vue'
export default defineComponent({
  name: 'cardlist',
  props: {
    appid: {
      type: String,
      required: true
    }
  },
  components: {
    fccard
  },
  setup: () => {
    return {
      pageList: [
        {
          id: '1',
          title: 'string',
          avatar: require('@/assets/logo.png'),
          content: 'Some quick example text to build on the card title and make up the bulk of the cards content',
          footer: 'string'
        },
        {
          id: '2',
          title: 'string',
          avatar: require('@/assets/logo.png'),
          content: 'Some quick example text to build on the card title and make up the bulk of the cards content',
          footer: 'string'
        },
        {
          id: '3',
          title: 'string',
          avatar: require('@/assets/logo.png'),
          content: 'Some quick example text to build on the card title and make up the bulk of the cards contentSome quick example text to build on the card title and make up the bulk of the cards content',
          footer: 'string'
        }
      ]
    }
  }
})
</script>
