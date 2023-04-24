<script setup lang="ts">
import {
	IonApp,
	IonRouterOutlet
} from '@ionic/vue'

import api from '@/api'

api.health.getHealth()
</script>
<template>
	<ion-app>
		<ion-router-outlet></ion-router-outlet>
	</ion-app>
</template>
