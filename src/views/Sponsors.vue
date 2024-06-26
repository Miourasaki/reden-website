<script setup lang="ts">
import { doFetchGet } from '@/constants';
import { ref, Ref } from 'vue';
import { toast } from 'vuetify-sonner';

type Sponsor = {
  name: string;
  detail?: string;
  avatar: string;
  amount: number;
  unit: string;
  message?: string;
};

const unitDisplay: Record<string, string> = {
  CNY: '¥',
  USD: '$',
  EUR: '€',
  JPY: 'JP¥',
  KRW: '₩',
  GBP: '£',
  CAD: 'C$',
  AUD: 'A$',
  HKD: 'HK$',
};

const sponsors: Ref<Sponsor[]> = ref([]);
doFetchGet('/api/sponsors')
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject('Failed to fetch sponsors');
    }
  })
  .then((data) => {
    sponsors.value = data.sort((a: Sponsor, b: Sponsor) => {
      return b.amount - a.amount;
    });
  })
  .catch((e) => {
    console.error(e);
    toast('Failed to fetch sponsors', {
      description: 'Please try again later',
      duration: 5000,
      cardProps: {
        color: 'error',
      },
    });
  });
</script>

<template>
  <h1 class="text-center text-3xl font-bold mt-8">
    {{ $t('sponsors.title') }}
  </h1>
  <p class="text-center my-2">
    {{ $t('sponsors.description') }}
  </p>
  <v-card class="content-common" border>
    <v-list
      subheader
      three-line
      link
      v-for="sponsor in sponsors"
      :key="sponsor.name"
    >
      <!--suppress VueUnrecognizedDirective -->
      <v-list-item :key="sponsor.name" v-ripple>
        <v-list-item-title class="text-h6">{{
          sponsor.name
        }}</v-list-item-title>
        <v-list-item-subtitle>{{
          sponsor.detail || unitDisplay[sponsor.unit] + sponsor.amount
        }}</v-list-item-subtitle>
        <v-list-item-action>
          <v-img :src="sponsor.avatar" />
        </v-list-item-action>

        <div v-html="sponsor.message" />
      </v-list-item>
    </v-list>
  </v-card>
  <div class="flex flex-col items-center content-common notice">
    <p>
      {{ $t('sponsors.notice') }}
    </p>
    <p class="text-md-h5">
      {{ $t('sponsors.alipay') }}
    </p>
    <img src="@/assets/reden-alipay.png" alt="" width="200" />
  </div>
</template>

<style scoped>
a {
  color: #cccccc;
  text-decoration: none;
}

a:hover {
  color: #ffffff;
  text-decoration: underline;
}

.notice {
  padding: 40px;
}
</style>
