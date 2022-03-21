<template>
  <div id="map"></div>
</template>

<script>
export default {
  name: "KakaoMap",
  props: {
    x: {
      type: Number,
      require: true,
      default: 129.0807270648317,
    },
    y: {
      type: Number,
      require: true,
      default: 35.19656853772262,
    },
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const APIKEY = "87351543712a38082a71d41e98845f74"
      const script = document.createElement('script');
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
          'https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=' + APIKEY;
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      const container = document.querySelector('#map')
      const options = {
        center: new kakao.maps.LatLng(this.y, this.x),
        level: 3
      }
      const map = new kakao.maps.Map(container, options)
      const markerPosition = new kakao.maps.LatLng(this.y, this.x);

      const marker = new kakao.maps.Marker({
        position: markerPosition
      });
      marker.setMap(map)
    }
  }
}
</script>

<style scoped>
#map {
  width: 700px;
  height: 500px;
  margin: 0 auto;
  border: 1px solid #CDCECF;
}
</style>