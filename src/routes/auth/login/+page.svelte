<script lang="ts">
  import LoginForm from '../../../components/loginForm.svelte';
  import { goto } from '$app/navigation';

  let isLoading = $state(false);
  let error = $state<string | null>(null);

  async function handleLogin(event: CustomEvent<{ email: string; password: string; rememberMe: boolean }>) {
    const { email, password, rememberMe } = event.detail;
    
    isLoading = true;
    error = null;

    try {
      // TODO: Remplacer par votre appel API d'authentification
      // Exemple:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, rememberMe })
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('Échec de la connexion');
      // }
      // 
      // const data = await response.json();
      // // Stocker le token, etc.
      
      // Simulation d'une connexion (à remplacer)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirection après connexion réussie
      goto('/');
    } catch (err) {
      error = err instanceof Error ? err.message : 'Une erreur est survenue lors de la connexion.';
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="min-h-screen bg-base-200 flex items-center justify-center p-4">
  <LoginForm 
    bind:isLoading 
    bind:error 
    on:login={handleLogin}
  />
</div>
