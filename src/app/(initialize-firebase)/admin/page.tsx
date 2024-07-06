export default function LoginPage() {
  return (
    <main
    className="flex min-h-dvh flex-col items-center justify-center p-10">
      <form action="">
        <h1>Iniciar sesión</h1>
        <input
          type="email"
          name="email"
          placeholder="admin@gmail.com"
          required />
        <input
          type="password"
          name="password"
          placeholder="Tu contraseña"
          required />
          <button type="submit">Ingresar</button>
      </form>
    </main>
  )
}
