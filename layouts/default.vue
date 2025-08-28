<!-- layouts/default.vue -->
<template>
  <div class="layout">
    <Header />
    <Transition name="page" mode="out-in">
      <main>
            <slot />
      </main>
     </Transition>
    <Footer />
  </div>
</template>