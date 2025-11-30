<script>
    import { backendFetch } from "../lib/backend";
  let email = "";
  let password = "";
  let confirmPassword = "";
  let accepted = false;
const resqueste = new backendFetch();

  function handleSubmit() {
    if (!accepted) {
      alert("Vous devez accepter les conditions d'utilisation.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    // Traitement du formulaire
    console.log({
      email,
      password,
      confirmPassword,
      accepted
    });

     resqueste.post("/signup",{email,password})
     .then((response)=>{
     console.log(response);
     })
     .catch((error)=>{
     console.log(error);
    })

  }
</script>

<div class="min-h-screen flex items-center justify-center bg-base-200 p-4">
  <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-6">

    <!-- Logo -->
    <div class="flex flex-col items-center space-y-2">
      <h2 class="text-2xl font-bold text-center">Create An Account</h2>
    </div>

    <!-- Form -->
    <form class="space-y-4" on:submit|preventDefault={handleSubmit}>

      <!-- Email -->
      <label class="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12H8m8 0l-8-4m8 4l-8 4" />
        </svg>
        <input type="email" bind:value={email} class="grow" placeholder="Enter Your Email" required />
      </label>

      <!-- Password -->
      <label class="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c1.657 0 3-1.343 3-3V6a3 3 0 10-6 0v2c0 1.657 1.343 3 3 3z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13h14v7H5z" />
        </svg>
        <input type="password" bind:value={password} class="grow" placeholder="Password" required />
      </label>

      <!-- Confirm Password -->
      <label class="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c1.657 0 3-1.343 3-3V6a3 3 0 10-6 0v2c0 1.657 1.343 3 3 3z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13h14v7H5z" />
        </svg>
        <input type="password" bind:value={confirmPassword} class="grow" placeholder="Confirm Password" required />
      </label>

      <!-- Check Terms -->
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" class="checkbox checkbox-success" bind:checked={accepted} />
        <span class="text-sm">
          I agree to the
          <a class="text-orange-500 font-medium cursor-pointer" href="#">Terms & Conditions</a>
          and
          <a class="text-orange-500 font-medium cursor-pointer">Privacy Policy</a>
        </span>
      </label>

      <!-- Submit -->
      <button type="submit" class="btn bg-green-900 text-white w-full rounded-xl">
        Sign Up
      </button>
    </form>

    <!-- Divider -->
    <div class="text-center text-sm opacity-70">Or sign up with</div>

    <!-- Social buttons -->
    <div class="flex justify-center gap-4">
      <button class="btn btn-outline btn-circle">
        <img src="/google.svg" class="h-6" />
      </button>
      <button class="btn btn-outline btn-circle">
        <img src="/facebook.svg" class="h-6" />
      </button>
      <button class="btn btn-outline btn-circle">
        <img src="/apple.svg" class="h-6" />
      </button>
    </div>

    <!-- Footer -->
    <p class="text-center text-sm">
      Already have an account?
      <a class="text-orange-500 font-semibold cursor-pointer" href="login">Sign In</a>
    </p>
  </div>
</div>

