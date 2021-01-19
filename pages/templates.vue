<template>
  <section class="section">
    <div class="container">
      <div class="title has-text-centered" v-if="!verified">
        Verifying your connection...
      </div>
      <div class="title has-text-centered" v-else>
        Here are your
        <a
          href="https://drive.google.com/drive/folders/1I3G3iUguhN_bSGxT5Mw-iktXuESlnIYF?usp=sharing"
          class="has-text-info"
          style="text-decoration: underline"
          >templates</a
        >.
      </div>
    </div>
  </section>
</template>

<script>
export default {
  middleware: null,
  data() {
    const verified = localStorage.getItem('template-link-verified')
    return {
      verified,
    }
  },
  mounted() {
    if (!this.verified) {
      setTimeout(() => {
        this.verified = true
        localStorage.setItem('template-link-verified', 'verified')
      }, 2000)
    }
  },
}
</script>

<style></style>
