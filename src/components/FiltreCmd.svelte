<script lang="ts">
    export let statusFilter: string;
    export let onChange: (value: string) => void;
</script>

<select
    class="select select-bordered mb-4 w-full"
    bind:value={statusFilter}
    on:change={(e) => onChange(e.target.value)}
>
    <option value="all">Toutes</option>
    <option value="pending">En attente</option>
    <option value="processing">En cours</option>
    <option value="shipped">Expédiée</option>
    <option value="delivered">Livrée</option>
    <option value="canceled">Annulée</option>
</select>
