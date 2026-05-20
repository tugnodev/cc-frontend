<script lang="ts">
    import { BackendFetch } from "$lib/backend";
    import { user } from "$lib/store/users";
    import { TokenManager } from "$lib/token";
    import { onMount } from "svelte";
    import { userArticles } from "$lib/store/articles";
    import { orders } from "$lib/store/order";

    interface stats {
        articles: {
            total: number;
            rupture: number;
        };
        commandes: {
            total: number;
            attente: number;
            acceptees: number;
            annulees: number;
        };
    }

    let dashboardData = $state<stats>({
        articles: {
            total: 0,
            rupture: 0,
        },
        commandes: {
            total: 0,
            attente: 0,
            acceptees: 0,
            annulees: 0,
        },
    });

    onMount(async () => {
        (await user.get()).subscribe(async (usr) => {
            let fetch: BackendFetch;
            {
                const tm = new TokenManager();
                const token = await tm.loadToken();
                fetch = new BackendFetch(token!);
            }

            const stats = (await fetch.get(`/stats/${usr?.id}`)) as stats;
            dashboardData = stats;
        });
    });
</script>

<div class="text-base-content w-full flex flex-col mb-8 gap-8 p-4 md:p-8">
    <div class="flex justify-between items-end border-b border-base-300 pb-4">
        <div>
            <h1 class="text-3xl font-bold">Tableau de Bord</h1>
            <p class="text-base-content/70 mt-1">
                Aperçu général de votre activité
            </p>
        </div>
        <button class="btn btn-primary btn-sm">Actualiser</button>
    </div>

    <section class="w-full flex flex-col gap-4">
        <h2 class="text-xl font-semibold">Inventaire</h2>

        <div class="w-full rounded shadow border border-base-300 bg-base-100">
            <div class="stat">
                <div class="stat-figure text-primary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        class="inline-block w-8 h-8 stroke-current"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        ></path></svg
                    >
                </div>
                <div class="stat-title">Total des articles</div>
                <div class="stat-value text-primary">
                    {dashboardData.articles.total}
                </div>
                <div class="stat-desc">Articles actifs au catalogue</div>
            </div>

            <div class="stat">
                <div class="stat-figure text-error">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        class="inline-block w-8 h-8 stroke-current"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        ></path></svg
                    >
                </div>
                <div class="stat-title">En rupture de stock</div>
                <div class="stat-value text-error">
                    {dashboardData.articles.rupture}
                </div>
                <div class="stat-desc text-error font-medium">
                    Réapprovisionnement urgent
                </div>
            </div>
        </div>
    </section>

    <section class="w-full flex flex-col gap-4">
        <h2 class="text-xl font-semibold">Commandes</h2>

        <div class="rounded shadow w-full border border-base-200 bg-base-100">
            <div class="stat">
                <div class="stat-title">Total des commandes</div>
                <div class="stat-value">{dashboardData.commandes.total}</div>
                <div class="stat-desc">Sur les 30 derniers jours</div>
            </div>

            <div class="stat">
                <div class="stat-title">En attente</div>
                <div class="stat-value text-warning">
                    {dashboardData.commandes.attente}
                </div>
                <div class="stat-desc">À traiter aujourd'hui</div>
            </div>

            <div class="stat">
                <div class="stat-title">Acceptées</div>
                <div class="stat-value text-success">
                    {dashboardData.commandes.acceptees}
                </div>
                <div class="stat-desc">Prêtes pour expédition</div>
            </div>

            <div class="stat">
                <div class="stat-title">Annulées</div>
                <div class="stat-value text-error">
                    {dashboardData.commandes.annulees}
                </div>
                <div class="stat-desc text-base-content/50">Motifs divers</div>
            </div>
        </div>
    </section>
</div>
