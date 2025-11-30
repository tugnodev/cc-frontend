<script>
    import { onMount } from "svelte";
    import SignupForm from "../../../components/SignupF.svelte";
    import SignupF from "../../../components/SignupF.svelte";

    let email = "";
    let password = "";

    onMount(() => {
        console.log("Signup page mounted");
    });
</script>

<main>
    <SignupF />
</main>
