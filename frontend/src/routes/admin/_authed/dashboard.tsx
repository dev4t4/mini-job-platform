import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_authed/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = Route.useRouteContext()

  return (
    <section>
      <header className="p-4 flex gap-10 items-center bg-background text-forground shadow-lg max-w-6xl mx-auto">
        <h1 className="ml-4 text-xl font-semibold">Admin</h1>
        <ul className="flex gap-5">
          <li>applicants</li>
          <li>positions</li>
        </ul>
      </header>
      <div>{/* Dashboard content */}</div>
    </section>
  )
}
