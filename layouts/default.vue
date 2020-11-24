<template>
  <div class="fade-in">
    <Nuxt />
  </div>
</template>

<style>
html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px #f1f1f1 inset !important;
  /*use inset box-shadow to cover background-color*/
  -webkit-text-fill-color: #000000 !important;
  /*use text fill color to cover font color*/
}
</style>
