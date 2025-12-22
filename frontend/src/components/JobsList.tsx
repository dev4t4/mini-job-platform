import { Link } from '@tanstack/react-router'

type JobItem = {
  title: string
  department: string
  type: string
  location: string
  link: string
}

type JobsListProps = { jobs: JobItem[] }

function ListItem({ job }: { job: JobItem }) {
  return (
    <li className="flex gap-x-3 py-3">
      <div className="flex-[1.2] flex">
        <div className="font-medium flex-1">
          <h3 className="text-lg sm:text-xl">{job.title}</h3>
          <p className="flex space-x-0.5 text-sm text-gray-500 font-normal sm:font-medium sm:text-lg">
            <span>{job.department}</span>
            <span className="sm:hidden">&middot;{job.type}&middot;</span>
            <span className="sm:hidden">{job.location}</span>
          </p>
        </div>
        <div className="text-lg hidden text-gray-500 font-medium flex-1 justify-evenly items-center sm:flex">
          <p>{job.type}</p>
          <p>{job.location}</p>
        </div>
      </div>

      <div className="flex flex-[0.2] justify-end items-center pr-3">
        <Link
          className="border border-gray-300 rounded px-1.5 py-1 text-sm font-semibold shadow-sm sm:text-l"
          to={job.link}
        >
          Apply
        </Link>
      </div>
    </li>
  )
}

function JobsList({ jobs }: JobsListProps) {
  return (
    <ul className="divide-y divide-gray-200">
      {jobs.map((job, index) => {
        return <ListItem job={job} key={job.title + '_' + index} />
      })}
    </ul>
  )
}

export default JobsList
