<script>
export default {
  props: {
    size: {
      type: String,
      default: "standart",
    },
  },
};
</script>

<template>
  <button class="three-dots-btn">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      :class="[
        { mini: size === 'mini' },
        { standart: size === 'standart' },
        { big: size === 'big' },
      ]"
      fill="currentColor"
      class="bi bi-three-dots"
      viewBox="0 0 16 16"
    >
      <path
        d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
      />
    </svg>
  </button>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  height: 100%;
  flex-direction: column;
}
.three-dots-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  height: 100%;
  flex-grow: 0;

  svg {
    height: 100%;
    width: auto;
  }

  .mini{
    width: 16px;
    height: 16px;
  }
  .standart{
    width: 20px;
    height: 20px;
  }

  .big{
    width: 24px;
    height: 24px;
  }

  &:hover {
    border-radius: 3px;
    background-color: var(--transparentHover);
  }
}
</style>
