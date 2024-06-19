<script lang="ts">
	import RedditIcon from './../assets/redditIcon.svelte';
	import TelegramIcon from './../assets/telegramIcon.svelte';
	import LinkedinIcon from './../assets/linkedinIcon.svelte';
	import GithubIcon from './../assets/githubIcon.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { textContent, languageSelected } from '$lib/store';
	import Saos from 'saos';
	import colorExplosion from '$lib/assets/colorExplosion.png';

	import colorExplosion2 from '$lib/assets/colorExplosion2.png';
	import colorExplosion3 from '$lib/assets/colorExplosion3.png';

	let showingSection: boolean;
	let hoveringForm = false;
	function handleUpdateSectionView(x: { detail: { observing: boolean } }) {
		showingSection = x.detail.observing;
	}
</script>

<Saos on:update={handleUpdateSectionView}>
	<!-- top={200} bottom={0} -->
	<!-- hover:before:!opacity-60 -->
	<section
		id="contact"
		class="bg-strokes {hoveringForm ? `apply-other-bg-img` : ''} section col-span-2 bg-black rounded-2xl py-12 px-4 xs:px-6 sm:px-8 gradient-dark-one overflow-x-hidden overflow-y-hidden"
	>
		<h2 class="font-title font-bold text-2xl xs:text-3xl text-c-body-text-light mb-6 lowercase z-10 relative">
			5. {$textContent.contact.title[$languageSelected] ?? 'CONTACT'}
		</h2>
		<div class="relative max-w-4xl mx-auto mt-8 md:mt-24 flex max-md:flex-col-reverse gap-8">
			<div class="md:hidden relative z-10 bg-white gradient-white rounded-xl p-6">
				<h2 class="text-black text-lg xs:text-xl font-title font-bold text-center">Social Media</h2>
				<nav class="max-w-lg mx-auto text-black">
					<ul class="flex gap-x-4 justify-center mt-5 mb-2">
						<li class="hover:text-black hover:scale-110 transition-all">
							<a href="."><GithubIcon /></a>
						</li>
						<li class="hover:text-black hover:scale-110 transition-all">
							<a href="."><LinkedinIcon /></a>
						</li>
						<li class="hover:text-black hover:scale-110 transition-all">
							<a href="."><TelegramIcon /></a>
						</li>
						<li class="hover:text-black hover:scale-110 transition-all">
							<a href="."><RedditIcon /></a>
						</li>
					</ul>
				</nav>
			</div>
			<form
				method="POST"
				action="?/submitForm"
				class="relative z-10 flex flex-col gap-y-6 py-6 px-4 xs:px-6 bg-gray-300 bg-opacity-0 rounded-xl flex-[7] gradient-form backdrop-blur-[10px] border-2 border-c-body-text-light/50 "
				on:mouseenter={() => hoveringForm = true} on:mouseleave={() => hoveringForm = false}
				>
				{#if $textContent}
					<label class="text-c-body-text-light font-semibold">
						<h3 class="text-lg">{$textContent.contact.form.name.title[$languageSelected]}</h3>
						<input
							autocomplete="off"
							required
							name="name"
							type="text"
							placeholder={$textContent.contact.form.name.placeholder[$languageSelected]}
							class="input-form"
						/>
					</label>
					<label class="text-c-body-text-light font-semibold">
						<h3 class="text-lg">{$textContent.contact.form.email.title[$languageSelected]}</h3>
						<input
							autocomplete="off"
							required
							name="email"
							type="email"
							placeholder={$textContent.contact.form.email.placeholder[$languageSelected]}
							class="input-form"
						/>
					</label>
					<label class="text-c-body-text-light font-semibold h-full">
						<h3 class="text-lg">{$textContent.contact.form.message.title[$languageSelected]}</h3>
						<textarea
							autocomplete="off"
							required
							name="message"
							placeholder={$textContent.contact.form.message.placeholder[$languageSelected]}
							rows="6"
							class="input-form resize-none"
						></textarea>
					</label>
					<Button
						type="submit"
						class="bg-black flex-1 w-full min-w-full block text-white font-title font-bold text-lg xs:text-xl rounded-[5px] ease-out shadow-[#000000bb] active:bg-black hover:bg-black hover:brightness-90 active:scale-95 transition-all "
						>{$textContent.contact.form.submitButton[$languageSelected]}</Button
					>
				{/if}
			</form>
			<div class="relative z-10 flex flex-col gap-y-7 flex-[5]">
				<div
					class="bg-white gradient-white rounded-xl p-6 mt-auto relative transition-all perspective-400 ease-[cubic-bezier(0.645,0.045,0.355,1.000)] duration-2000"
				>
					<h2 class="text-black text-lg xs:text-xl font-title font-bold text-center mb-5">
						{$textContent.contact.description[$languageSelected]}
					</h2>
					<svg
						class="mx-auto mb-2"
						width="100"
						height="93"
						viewBox="0 0 100 93"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M50.5312 53.3695L35.4062 61.8955C32.8906 63.3092 32.4062 65.854 34.3125 67.6701C36.3281 69.6058 40.25 69.9865 42.9531 68.5183L58.4688 60.1228C59.5625 59.5356 61.125 59.6661 61.9844 60.4273C62.8438 61.1886 62.6406 62.2761 61.5469 62.8742L58.2812 64.636L85.9688 82.384H92.5C96.6406 82.384 100 80.0458 100 77.164V63.244C100 60.3621 96.6406 58.024 92.5 58.024H80.625H80H79.8906L79.2812 57.7521L67.9375 52.6952C65.5469 51.6295 62.75 51.064 59.9062 51.064C56.5 51.064 53.1875 51.8796 50.5312 53.3695ZM54.0938 66.898L46.0156 71.2697C41.0938 73.945 33.9531 73.249 30.2656 69.7255C26.7969 66.4086 27.6719 61.7758 32.25 59.1985L45.25 51.8796C43.4375 51.3467 41.4844 51.0748 39.5 51.0748C36.5625 51.064 33.7031 51.673 31.25 52.804L20 58.024H7.5C3.35938 58.024 0 60.3621 0 63.244V77.164C0 80.0458 3.35938 82.384 7.5 82.384H24.4062L38.6875 91.4537C41.75 93.4003 46.4844 93.2481 49.2812 91.1166C50.1406 90.4532 50.7188 89.6811 51.0156 88.8763L53.6719 90.5728C56.7188 92.5195 61.4688 92.3781 64.2656 90.2575C64.9688 89.7246 65.4844 89.1047 65.8125 88.4631C68.8438 89.8768 72.9688 89.5832 75.5156 87.6475C78.3125 85.5268 78.1094 82.2208 75.0625 80.2742L54.0938 66.898Z"
							fill="#111"
						/>
						<path
							d="M28.6875 6.25C26.0996 6.25 24 8.34961 24 10.9375C24 12.4121 24.6934 13.7988 25.875 14.6875L47.125 30.625C48.2383 31.4551 49.7617 31.4551 50.875 30.625L72.125 14.6875C73.3066 13.7988 74 12.4121 74 10.9375C74 8.34961 71.9004 6.25 69.3125 6.25H28.6875ZM24 17.1875V37.5C24 40.9473 26.8027 43.75 30.25 43.75H67.75C71.1973 43.75 74 40.9473 74 37.5V17.1875L52.75 33.125C50.5234 34.7949 47.4766 34.7949 45.25 33.125L24 17.1875Z"
							fill="#111"
						/>
					</svg>
				</div>
				<div class="max-md:hidden bg-white gradient-white rounded-xl p-6">
					<h2 class="text-black text-lg xs:text-xl font-title font-bold text-center">
						{$languageSelected == 'en' ? 'Social Media' : 'Mídias sociais'}
					</h2>
					<nav class="max-w-lg mx-auto text-gray-200">
						<ul class="flex gap-x-4 justify-center mt-5 mb-2">
							<li class="hover:text-black text-stone-600 transition-all duration-200 ease-in">
								<a href="https://github.com/muriWolf" target="_blank" rel="author"><GithubIcon /></a
								>
							</li>
							<li class="hover:text-black text-stone-600 transition-all duration-200 ease-in">
								<a
									href="https://www.linkedin.com/in/murillo-pinheiro-de-oliveira-2b931724a/"
									target="_blank"
									rel="author"><LinkedinIcon /></a
								>
							</li>
							<li class="hover:text-black text-stone-600 transition-all duration-200 ease-in">
								<a href="https://web.telegram.org/k/#@MuriWolf" target="_blank" rel="author"
									><TelegramIcon /></a
								>
							</li>
							<li class="hover:text-black text-stone-600 transition-all duration-200 ease-in">
								<a href="https://web.telegram.org/k/#@MuriWolfhttps://web.telegram.org/k/#@MuriWolf" target="_blank" rel="author"
									><RedditIcon /></a
								>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	</section>
</Saos>

<style>
	* { 
		perspective: 1000;
		-webkit-perspective: 1000;
	}
	form *::-webkit-scrollbar-track {
		background-color: #f9f9f9 !important;
	}
	.apply-other-bg-img::before {
		content: '';
		background-image: url('/strokes.png') !important;
	}
	@supports(-moz-appearance:none) {
		.apply-other-bg-img::before {
			content: '';
			background-image: url('/strokes2.png') !important;
		}
	}
</style>

