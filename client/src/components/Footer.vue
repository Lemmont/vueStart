<script></script>

<template>
  <footer>
    <div>Vue Example</div>
    <div>
      <ul>
        <li>insta</li>
        <li>twitter</li>
        <li>youtube</li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
footer {
  width: 100vw;
  min-height: 8vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2vh 2vw;
  font-size: 1.1rem;
  background-color: var(--component-color);
}

ul {
  display: flex;
  width: auto;
  list-style: none;
}

li {
  margin: 0 1vw;
}
</style>
