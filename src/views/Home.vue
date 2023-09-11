<template>
  <div class="home">
    <app-modal :users="users"/>
  </div>
</template>

<script>
import AppModal from '@/components/Modal'

export default {
  name: 'Home',
  components: {
    AppModal
  },
  data() {
    return {
      users: []
    }
  },
  mounted(){
    this.getUsers()
  },
  methods: {
    async getUsers(){
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      this.users = await res.json()
    }
  }
}
</script>

<style scoped>
.home {
  background-color: #545454;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>