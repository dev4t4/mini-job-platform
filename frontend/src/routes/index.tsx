import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="min-h-screen w-full mx-auto flex items-center justify-center sm:max-w-5xl">
      <Link to="/careers">
        <Button> See open positions</Button>
      </Link>
    </div>
  )
}
