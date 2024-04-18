<template>
<div id="MainImageSlide">
    <!-- Bootstrap Carousel -->
    <div id="carouselImage" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <!-- Carousel items -->
        <div class="carousel-item" v-for="(item, index) in items" :class="{ active: index === 0 }" :key="index">
          <img :src="item.image" class="d-block w-100" :alt="item.altText">
          <div class="carousel-caption d-none d-md-block">
            <h5>{{ item.image }}</h5>
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
      <!-- Left control -->
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselImage" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <!-- Right control -->
      <button class="carousel-control-next" type="button" data-bs-target="#carouselImage" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>


</template>


<script>
export default {
  name: "MainImageSlide",
  data() {
    return {
        items: [
            {image: '@/assets/main_seoul.png', altText:'image1', text:"안녕하세요" },
            {image: '@/assets/main_jeju.png', altText:'image2', text:"안녕하세요" },
            {image: '@/assets/main_busan.png', altText:'image3', text:"안녕하세요" }
        ]
    }
  }
};
</script>

<style>
.carousel-caption {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 0.25rem;
  }
</style>
