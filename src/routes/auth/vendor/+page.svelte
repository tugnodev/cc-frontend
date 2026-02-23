<script lang="ts">
    import Main from "../../../components/Main.svelte";
    import { address, type userDto } from "$lib/services/dtos/user";
    import { goto } from "$app/navigation";
    import { HomeIcon } from "@lucide/svelte";
    import { BackendFetch } from "$lib/backend";
    import { TokenManager } from "$lib/token";
    import { user as usr } from "$lib/store/users";

    let phoneNumber = $state("");
    let selectedAddress = $state<address | "">("");
    let fetching = $state(false);

    const addressOptions = Object.values(address);

    async function handleSubmit(event: Event) {
        event.preventDefault();
        fetching = true;
        const user = await usr.get();

        user.subscribe(async (user) => {
            const tm = await new TokenManager().loadToken().then((token) => {
                if (typeof token === "string") {
                    return token;
                } else return;
            });

            const fetch = new BackendFetch(tm!);

            console.log("Données soumises :", { phoneNumber, selectedAddress });
            const res = await fetch.patch("/update/vendor", {
                id: user!.id,
                address: selectedAddress,
                phone: phoneNumber,
            });
            switch (typeof res) {
                case "string":
                    fetching = false;
                    console.log(res);
                    break;
                case "object":
                    fetching = false;
                    console.log(JSON.stringify(res));
                    usr.set(res as userDto);
                    window.location.href = "/market/profile";
                    break;
            }
        });
    }
</script>

<Main>
    <div
        class="w-full flex flex-col gap-2 items-center justify-center h-full mb-6"
    >
        <h2 class="font-bold text-2xl">Devenir vendeur</h2>
        <p class="text-base-content/70">Veuillez renseigner ces informations</p>
    </div>

    <form class="flex flex-col w-full items-center gap-6 px-4">
        <input
            class="w-full input input-warning input-md bg-transparent border-2"
            type="tel"
            placeholder="Numéro de téléphone"
            bind:value={phoneNumber}
            required
        />

        <div class="w-full flex flex-col gap-2">
            <span class="text-sm font-semibold px-1"
                >Sélectionnez votre établissement :</span
            >

            <div
                class="flex gap-2 bg-base-200/50 border border-base-300 p-4 rounded-xl w-full"
            >
                {#each addressOptions as option}
                    <label
                        class="label flex-1 flex flex-col cursor-pointer justify-start gap-4 p-0"
                    >
                        <input
                            type="radio"
                            name="university_address"
                            class="radio radio-warning radio-sm"
                            value={option}
                            bind:group={selectedAddress}
                            required
                        />
                        <span class="label-text font-medium text-base"
                            >{option}</span
                        >
                    </label>
                {/each}
            </div>
        </div>
        <div class="w-full flex gap-1 mt-2">
            <button
                onclick={() => goto("/market/profile")}
                class="btn flex-1 btn-error btn-md"
            >
                <HomeIcon />
            </button>
            <button
                onclick={handleSubmit}
                class={`btn flex-6 btn-md ${fetching || phoneNumber === "" || selectedAddress === "" ? "btn-disabled" : "btn-warning"}`}
            >
                Soumettre
            </button>
        </div>
    </form>
</Main>
