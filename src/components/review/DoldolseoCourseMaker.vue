<template>
  <canvas id='canvas'
          width="900"
          height="550"
          ref="canvas"></canvas>
</template>

<script>
import {onMounted, ref} from "vue";

export default {
  name: "DoldolseoCourseMaker",
  setup() {

    let x = 180
    let y = 100
    let btnCount = 1
    let toggle = true
    const canvas = ref(null)

    onMounted(() => {
      // Logs: `Headline`
    drawDefaultNode(canvas.value)

    });

    const drawDefaultNode = (canvas) => {
      if (canvas.getContext) {
        const radius = 15;
        const ctx = canvas.getContext('2d')
        //원(Outer) 반지름 :15 / 둘레 : 2pi
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = "#29088A";
        ctx.fill();

        //원(Inner)
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);

        //기본 노드 색상
        ctx.fillStyle = "#BDBDBD";
        ctx.fill();

        //텍스트 추가
        // this.addText('출발');

        //toggle값에 따라 방향 반전 (drawCurve 호출시 toggle)
        if (toggle) {
          x += radius;
        } else {
          x -= radius;
        }
      }
    }

    return {
      canvas,
    }
  }
}
</script>

<style scoped>
</style>