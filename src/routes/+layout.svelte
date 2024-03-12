<script lang="ts">
	import { textContent, languageSelected } from "$lib/store";
  import "../style/app.css";
  import "../style/utilities.css";

  export let data;

  textContent.set(data.content);
  languageSelected.set(data.language || "en");
</script>

<slot />