<script setup lang="ts">
import { QBtn } from 'quasar';
import api from '@/api'

api.health.getHealth()
</script>
<template>
	<q-btn label="Standard" />
</template>
