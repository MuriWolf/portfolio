<script>
	import arrowComments from '$lib/assets/arrow-comments.svg';
	// import { clickOutside } from '$lib/utilities/clickOutside.js';
	import arrowDropDown from '$lib/assets/arrow_drop_down.svg';

	// title, id
	export let items;
	export let placeholder = 'Place holder...';
	// one two or three
	export let styleType = 1;

	let open = false;
	let language = '';

	function toggle() {
		open = !open;
	}

	/**
	 * @param {string} val
	 */
	function setItem(val) {
		language = val;
		open = false;
	}
</script>
<!-- use:clickOutside on:click_outside={() => (open = false)} -->
<div class="relative w-full focus:outline-0 focus:outline-none" >
    <button
        on:click|preventDefault={toggle}
        class="flex w-full items-center justify-between rounded bg-white p-4 px-3 border-light-typo focus:outline-0 focus:outline-none focus:border-main-dark-blue {language
            ? 'text-really-light-typo'
            : 'text-light-typo'} border-[1px] {open && 'ring-blue-600'}"
    >
        <span class="break-keep line-clamp-1 text-left"
            >{language === '' ? placeholder : language}</span
        >
        <img src={arrowComments} width="20" height="20" class="w-5 h-5 focus:outline-none" alt="dropdown arrow" />
    </button>

</div>


<style>
	button:focus {
		outline: none;
	}
</style>