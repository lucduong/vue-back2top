<template>
  <transition name='back2top'>
    <back-2-top @click="back2Top" v-if="isVisible">
      <i :class="icon"></i>
    </back-2-top>
  </transition>
</template>

<script>
import { scrollTop } from "./helper";
export default {
  props: {
    height: {
      type: Number,
      default: 400
    },
    duration: {
      type: Number,
      default: 1000
    },
    timing: {
      type: String,
      default: "linear"
    },
    icon: {
      type: String,
      default: "el-icon-caret-top"
    }
  },

  data() {
    return {
      isVisible: false
    };
  },

  methods: {
    initToTopButton() {},

    handleScroll(event) {
      this.isVisible = window.pageYOffset >= this.height;
    },

    back2Top() {
      const sTop =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (
              document.documentElement ||
              document.body.parentNode ||
              document.body
            ).scrollTop;
      scrollTop(window, sTop, 0, this.duration, this.timing);
      this.$emit("click");
    }
  },

  mounted() {},

  created() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleScroll);
  },

  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleScroll);
  }
};
</script>

<style>
.back-2-top {
  background-color: #fff;
  position: fixed;
  right: 10px;
  bottom: 10px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
}

.back-2-top i {
  color: #409eff;
  display: block;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
}

.back2top-enter-active,
.back2top-leave-active {
  transition: opacity 0.5s ease-in;
}
.back2top-enter,
.back2top-leave-to {
  opacity: 0;
}
</style>
