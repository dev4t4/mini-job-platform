import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import ApplyForm from '@/components/ApplyForm'
import { ChevronLeft  } from 'lucide-react';
export const Route = createFileRoute('/careers/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className="my-4 py-6 mx-auto w-full space-y-4 sm:max-w-5xl">
      <div className="w-full px-4">
        <Link className=' flex text-sm font-semibold items-center gap-1' to="/careers"> <ChevronLeft  className='w-4 h-4'/> Browse all open positions </Link>
      </div>
      <div className="w-full sm:px-4 flex flex-col gap-3 sm:flex-row">
        <div className="px-4 gap-5 w-full space-y-2 py-3 bg-gray-50 rounded-xl max-h-fit  sm:sticky sm:top-30 sm:max-w-70 sm:ml-3">
          <h1 className="text-2xl font-semibold">Software engineer</h1>
          <p className="text-l font-medium text-gray-500">
            Hybird - Rabat, Morocco
          </p>
          <Button>Apply</Button>
        </div>
        <div className="w-full px-4 flex gap-5 flex-col sm:flex-1">
          {/* start placeholder */}
          <article className="px-1 sm:px-8 text-lg font-medium text-gray-500">
            <h1>Fullstack Developer</h1>
            <p>
              We are seeking a talented <strong>Fullstack Developer</strong> to
              join our dynamic team. You will work on building scalable web
              applications, integrating backend services, and collaborating
              closely with product designers and other engineers.
            </p>

            <h2>Responsibilities</h2>
            <ul>
              <li>
                Develop and maintain web applications using{' '}
                <strong>React</strong>, <strong>Node.js</strong>, and{' '}
                <strong>TypeScript</strong>
              </li>
              <li>
                Collaborate with product and design teams to implement new
                features
              </li>
              <li>Write clean, maintainable, and efficient code</li>
              <li>Participate in code reviews and maintain coding standards</li>
              <li>Integrate third-party APIs and services</li>
              <li>Monitor and optimize application performance</li>
              <li>Troubleshoot and debug issues across the full stack</li>
            </ul>

            <h2>Requirements</h2>
            <ul>
              <li>3+ years of experience in fullstack web development</li>
              <li>
                Strong proficiency in <strong>JavaScript/TypeScript</strong>,{' '}
                <strong>React</strong>, and <strong>Node.js</strong>
              </li>
              <li>
                Experience with <strong>RESTful APIs</strong> and database
                systems (SQL/NoSQL)
              </li>
              <li>
                Familiarity with <strong>CI/CD pipelines</strong> and Git
              </li>
              <li>
                Understanding of cloud platforms (AWS, Azure, or GCP) is a plus
              </li>
              <li>Good communication skills and team collaboration</li>
              <li>Ability to write unit and integration tests</li>
            </ul>

            <h2>Perks</h2>
            <ul>
              <li>Flexible working hours and hybrid setup</li>
              <li>Health insurance and wellness benefits</li>
              <li>Professional development budget</li>
              <li>Casual and inclusive company culture</li>
              <li>Access to latest tools and technologies</li>
            </ul>
          </article>
          {/* end placeholder */}
          <section>
            <ApplyForm />
          </section>
        </div>
      </div>
    </section>
  )
}
