<template>
  <div class="container">
    <form>
      <div class="mb-3">
        <label for="userid" class="form-label">用户名</label>
        <input
          type="text"
          class="form-control"
          id="userid"
          v-model="value.userid"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">密码</label>
        <input
          type="password"
          name="password"
          v-model="value.password"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="button" class="btn btn-primary" @click="login">
        Submit
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import router from '../router'
import store from '@/store'

export default defineComponent({
  name: 'login',
  data () {
    return {
      value: {
        userid: '',
        password: ''
      }
    }
  },
  setup () {
    return {
    }
  },
  methods: {
    login () {
      store.dispatch('system/login', this.value).then((result: any) => {
        if (result) {
          this.$router.push('home')
        }
      })
    }
  }
})
</script>

<style lang="css">
.container {
  display: flex;
}
</style>
