<script setup lang="ts">
import {
	IonList,
	IonItem,
	IonIcon,
	IonTabs,
	IonTabBar,
	IonTabButton,
	IonLabel,
	IonRouterOutlet,
	IonPage,
	IonSplitPane,
	IonMenu,
} from '@ionic/vue';
import { home, documentText } from 'ionicons/icons';
import { useRouter, useRoute } from 'vue-router'

import { ViewName } from '@/router'
import { useScreenStore } from '@/stores'

const CONTENT_ID = 'base-layout-content'

const router = useRouter()
const route = useRoute()

const screenStore = useScreenStore()

const navigationItems = [
	{
		title: 'Главная',
		href: router.resolve({ name: ViewName.HomeView }).href,
		name: ViewName.HomeView,
		icon: home,
		handler: () => router.push({ name: ViewName.HomeView }),
	},
	{
		title: 'Документация',
		href: router.resolve({ name: ViewName.DocumentationView }).href,
		name: ViewName.DocumentationView,
		icon: documentText,
		handler: () => router.push({ name: ViewName.DocumentationView }),
	}
]
</script>

<template>
	<ion-page class="base-layout">
		<ion-split-pane
			v-if="screenStore.isSmUp"
			class="base-layout__split-pane"
			:class="{
				'base-layout__split-pane_tight': screenStore.isMdDown
			}"
			:content-id="CONTENT_ID"
			:when="true"
		>
			<ion-menu :content-id="CONTENT_ID">
				<ion-list>
					<ion-item
						v-for="navigationItem in navigationItems"
						:key="navigationItem.name"
						class="base-layout__sidebar-navigation-item"
						:class="{
							'base-layout__sidebar-navigation-item_selected': route.name === navigationItem.name
						}"
						router-direction="root"
						lines="none"
						:href="navigationItem.href"
						@click.prevent="navigationItem.handler"
					>
						<ion-icon
							slot="start"
							class="base-layout__sidebar-navigation-item-icon"
							:icon="navigationItem.icon"
						/>
						<ion-label
							v-if="screenStore.isLgUp"
							class="base-layout__sidebar-navigation-item-label"
						>
							{{ navigationItem.title }}
						</ion-label>
					</ion-item>
				</ion-list>
			</ion-menu>
			<div :id="CONTENT_ID">
				<ion-router-outlet animated="false" />
			</div>
		</ion-split-pane>

		<ion-tabs v-else>
			<ion-router-outlet animated="false" />
			<ion-tab-bar>
				<ion-tab-button 
					v-for="navigationItem in navigationItems"
					:key="navigationItem.name"
					:href="navigationItem.href"
					:selected="route.name === navigationItem.name"
					@click.prevent="navigationItem.handler"
				>
					<ion-icon :icon="navigationItem.icon" />
					<ion-label>{{ navigationItem.title }}</ion-label>
				</ion-tab-button>
			</ion-tab-bar>
		</ion-tabs>
	</ion-page>
</template>

<style lang="scss" scoped>
.base-layout {
	&__split-pane {
		--side-max-width: 270px;
		--side-width: 270px;
		--side-min-width: 56px;

		&_tight {
			--side-max-width: 56px;
		}
	}

	&__sidebar-navigation-item-icon {
		.base-layout__sidebar-navigation-item_selected & {
			color: var(--ion-color-primary);
		}

		.base-layout__split-pane_tight & {
			margin-right: 0;
		}
	}

	&__sidebar-navigation-item-label {
		.base-layout__sidebar-navigation-item_selected & {
			color: var(--ion-color-primary);
		}
	}
}
</style>
