<template>
  <div class="row">
    <div class="col">
      <p class="text-center">Cookies {{ cookies }} </p>
      <img src="https://th.bing.com/th/id/OIP.SVA_zCQxzh_SXmgkuMXFVQHaHR?rs=1&pid=ImgDetMain" class="img-fluid" @click="cookies++" >
    </div>
    <div class="col">
        <button class="btn btn-warning py-3" :disabled="goldenButtonDisabled" @click="activateGoldenButton">Golden Button</button>
      <p>Time left: {{ goldenButtonTimer }}</p>
    </div>
    <div class="col">
     <button v-for="(upgrade, name) in upgrades"
     class="btn btn-outline-success py-3"
     :disabled="cookies<upgrade.price"
     @click="buyUpgrade(upgrade)">
     Buy {{ name }} for 
     {{ upgrade.price }} clicks ({{ upgrade.cps }} clicks per second)
     {{ upgrade.count }}
    </button>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    setInterval(() => {
      for (const upgrade in this.upgrades) {
        this.cookies = (
          parseFloat(this.cookies) + this.upgrades[upgrade].cps * this.upgrades[upgrade].count
        ).toFixed(1);
      }
      if (this.isGoldenButtonActive) {
        this.goldenButtonTimer--;
        if (this.goldenButtonTimer === 0) {
          this.isGoldenButtonActive = false;
          this.goldenButtonTimer = 20;
        }
      }
    }, 1000);
  },
  data() {
    return {
      cookies: 0,
      upgrades: {
        cursor: { price: 10, cps: 0.1, count: 0 },
        mom: { price: 100, cps: 1, count: 0 },
        dad: { price: 150, cps: 2, count: 0 },
        grandma: { price: 1000, cps: 3, count: 0 },
      },
      isGoldenButtonActive: false,
      goldenButtonTimer: 20,
    };
  },
  computed: {
    goldenButtonDisabled() {
      return this.isGoldenButtonActive || this.upgrades.cursor.count < 10;
    },
  },
  methods: {
    clickCookie() {
      if (this.isGoldenButtonActive) {
        this.cookies += 10;
      } else {
        this.cookies++;
      }
    },
    activateGoldenButton() {
      if (this.upgrades.cursor.count >= 10) {
        this.upgrades.cursor.count -= 10;
        this.isGoldenButtonActive = true;
      }
    },
    buyUpgrade(upgrade) {
      if (this.cookies >= upgrade.price) {
        this.cookies -= upgrade.price;
        upgrade.price += Math.ceil(upgrade.price * 0.25);
        upgrade.count++;
      }
    },
  },
};
</script>
