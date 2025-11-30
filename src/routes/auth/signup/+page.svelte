<script>
<<<<<<< HEAD
    import SignupForm from "../../../components/SignupForm.svelte";
</script>

<main>
    <div>
        <section>
            <SignupForm />
        </section>
    </div>
=======
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
>>>>>>> be56b90 (signup)
</main>
