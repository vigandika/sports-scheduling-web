<template>
	<v-carousel v-model="model" hide-delimiters class="fixtures-carousel">
		<v-carousel-item
			v-for="(matchweeks, index) in fixtureList"
			:key="index"
			reverse-transition="expand-transition"
			transition="expand-transition"
		>
			<v-card class="mt-n7" width="100%" elevation="2" outlined>
				<v-card-text>
					<v-card-title class="text--primary justify-center">Matchweek {{ index + 1 }}</v-card-title>
					<v-divider></v-divider>
					<v-list>
						<v-list v-for="(fixtures, index) in matchweeks" :key="index">
							<v-list-item v-for="(fixture, index) in fixtures" :key="index">
								<v-list-item-content class="justify-center progress-ww">
									<div>
										<span>{{ fixture.homeTeam }}</span> <b>&nbsp;-&nbsp;</b> <span>{{ fixture.awayTeam }}</span>
									</div>
								</v-list-item-content>
							</v-list-item>
						</v-list>
					</v-list>
				</v-card-text>
			</v-card>
		</v-carousel-item>
	</v-carousel>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Matchweek } from "@/models/Matchweek";
import { PropType } from "vue";

@Component
export default class FixtureList extends Vue {
	@Prop({ type: Array as PropType<Matchweek[]>, required: true })
	private fixtureList: Array<Matchweek> | undefined;

	private model = null;
}
</script>

<style >
.fixtures-carousel .v-window__prev {
	top: 0;
	left: 30% !important;
	background-color: #6e8fb8;
}
.fixtures-carousel .v-window__next {
	top: 0;
	right: 30% !important;
	background-color: #6e8fb8;
}
.progress-ww div {
	display: flex;
}

.progress-ww div span {
	flex: 1;
	font-size: 1rem;
	font-weight: 500;
	color: #1f4e5f;
}

.progress-ww div span:first-of-type {
	text-align: right;
	padding-right: 5px;
}

.progress-ww div span:last-of-type {
	padding-left: 5px;
}
</style>
