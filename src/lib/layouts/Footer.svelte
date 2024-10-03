<script>
	import SocialMedias from '$lib/components/SocialMedias.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { languageSelected } from '$lib/store';
	import * as Tooltip from '$lib/components/ui/tooltip';

	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
</script>

<footer
	class="bg-c-primary border-[1px] border-c-primary-darker p-4 md:px-8 rounded-2xl mt-24 md:mt-32 sm:mt-24 mx-1 xs:mx-2 sm:mx-4"
	id="contact"
>
	<h1 class="font-bold text-c-text-darker text-3xl text-center font-title">
		{$languageSelected == 'pt' ? 'Podemos trabalhar juntos. Hoje.' : 'Let’s work together. Today.'}
	</h1>
	<a
		href={`mailto: murillopo.dev@email.com?subject=${$languageSelected == 'pt' ? 'Contato através do portfolio' : 'Contact from portfolio'}`}
		class="bg-c-secondary text-xl font-bold mx-auto block mt-6 max-w-lg w-full active:scale-95 transition-all ease-out text-center font-title text-stone-50 py-2 px-4 rounded-[2px] hover:bg-primary focus:bg-primary"
		>{$languageSelected == 'pt' ? 'Entre em contato agora' : 'Text me'}</a
	>
	<Separator class="mt-6 bg-c-primary-darker max-w-xl mx-auto" />
	<SocialMedias class="mx-auto my-6" orientation="horizontal" />
	<Tooltip.Root openDelay={0}>
		<Tooltip.Trigger class="block mx-auto text-center">
			<p class="text-c-text-darker text-center font-medium">
				{$languageSelected == 'pt'
					? 'Design e programação feito por mim'
					: 'Design and programming done by me'} <br />
				<strong>{currentYear}</strong>
			</p>
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p class="font-medium">
				{$languageSelected == 'pt'
					? 'Feito com a ajuda de meu amor ❤️'
					: 'Made with the help of my love ❤️'}
			</p>
		</Tooltip.Content>
	</Tooltip.Root>
</footer>
