import { DialogApplySpontaneously } from '@/components/ApplyForm'
import JobsList from '@/components/JobsList'
import { SelectWrapper } from '@/components/SelectWrapper'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/careers/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [value, setValue] = useState<string>("All departments")
  return (
    <section id="positions" className="my-4 py-6 mx-auto">
      <div className="w-full px-4 max-w-5xl mx-auto">
        <h2 className="text-center text-4xl font-semibold sm:text-4xl">
          Open Positions
        </h2>
        <div>
          <div className="flex flex-col py-6 gap-y-2  sm:flex-row">
            <h3 className="text-lg font-semibold flex-1 sm:text-xl">
              We have 9 open positions
            </h3>
            <SelectWrapper
              className="h-10 text-sm py-2 px-3 font-semibold sm:text-l"
              onChange={setValue}
              value={value}
              placeHolder="All departements"
              items={['All departments', 'Engineering', 'Marketing', 'Design']}
            />
          </div>
          <JobsList jobs={opnePositions} />
          <div className="flex items-center flex-col pt-5 gap-y-3">
            <p className="text-xl font-medium text-gray-500">
              No matching role right now?
            </p>
            <DialogApplySpontaneously />
          </div>
        </div>
      </div>
    </section>
  )
}

const opnePositions = [
  {
    title: 'Software engineer',
    type: 'Hybird',
    location: 'Rabat, Morocco',
    department: 'Engineering',
    link: '/careers/software-engineer',
  },
  {
    title: 'Media buyer',
    type: 'Hybird',
    location: 'Rabat, Morocco',
    department: 'Marketing',
    link: '/careers/marketing',
  },
]
