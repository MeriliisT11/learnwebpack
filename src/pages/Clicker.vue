<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-4 mb-4">
        <div class="card text-center">
          <div class="card-body">
            <p class="h4">Cookies: {{ cookies }}</p>
            <img src="https://pngimg.com/d/cookie_PNG13656.png" class="img-fluid cookie-img" @click="cookies++">
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-4">
        <div class="card text-center">
          <div class="card-body">
            <button class="btn btn-warning btn-golden" @click="goldenButtonClick">
              Buy Golden Button for 5 cursors
            </button>
            <p class="mt-2">Golden Button Clicks: {{ goldenButtonCount }}</p>
            <button class="btn btn-success mt-2" @click="buyFreeCookies" :disabled="goldenButtonCount < 5">
              Buy 10000 Free Clicks for 5 Golden Buttons
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-4">
        <div class="card text-center">
          <div class="card-body">
            <button v-for="(upgrade, name) in upgrades" :key="name"
              class="btn btn-primary btn-upgrade mb-2"
              :disabled="cookies < upgrade.price"
              @click="buyUpgrade(upgrade)">
              Buy {{ name }} for {{ upgrade.price }} clicks
              <br>({{ upgrade.cps }} clicks per second)
              <br>Count: {{ upgrade.count }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.cookie-img {
  cursor: pointer;
}

.btn-upgrade {
  width: 100%;
}
</style>

<script>
export default {
  created() {
    setInterval(this.updateCookiesAutomatically, 1000);
  },
  data() {
    return {
      cookies: 0,
      upgrades: {
        cursor: { price: 10, cps: 10, count: 0 },
        grandma: { price: 100, cps: 100, count: 0 },
        farm: { price: 1000, cps: 1000, count: 0 },
        factory: { price: 10000, cps: 10000, count: 0 },
        temple: { price: 100000, cps: 100000, count: 0 },
      },
      goldenButtonCount: 0,
    };
  },
  methods: {
    buyUpgrade(upgrade) {
      if (this.canAffordUpgrade(upgrade)) {
        this.cookies -= upgrade.price;
        upgrade.price += Math.ceil(upgrade.price * 0.25);
        upgrade.count++;
      }
    },
    canAffordUpgrade(upgrade) {
      return this.cookies >= upgrade.price;
    },
    updateCookiesAutomatically() {
      for (const upgrade in this.upgrades) {
        const cps = this.upgrades[upgrade].cps * this.upgrades[upgrade].count;
        this.cookies += cps;
      }
    },
    goldenButtonClick() {
      if (this.upgrades.cursor.count >= 5) {
        this.upgrades.cursor.count -= 5;
        this.goldenButtonCount++;
        // Perform any other actions related to the golden button click
      } else {
        alert("Not enough cursors to click the Golden Button!");
      }
    },
    buyFreeCookies() {
      if (this.goldenButtonCount >= 5) {
        this.goldenButtonCount -= 5;
        this.cookies += 10000; // Adjust as needed
        // Perform any other actions related to buying free cookies
      } else {
        alert("You need at least 5 Golden Buttons to buy 1000 Free Cookie Clicks!");
      }
    },
  },
};
</script>
