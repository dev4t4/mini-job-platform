import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { SelectWrapper } from './SelectWrapper'

export function DialogApplySpontaneously() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="default" className="">
            Apply spontaneously
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Apply spontaneously</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="full-name">Full name *</Label>
              <Input id="full-name" name="name" placeholder="Yassine Alaoui" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email address *</Label>
              <Input id="email" name="email" placeholder="example@mail.com" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="position">Position applying for *</Label>
              <SelectWrapper
                className="h-10 text-sm py-2 px-3 font-semibold sm:text-l w-full"
                placeHolder="All departements"
                items={[
                  'All departments',
                  'Engineering',
                  'Marketing',
                  'Design',
                ]}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="resume">Resume *</Label>
              <Input id="resume" name="resume" type="file" />
            </div>
            <div className="grid gap-3 ">
              <p className="text-muted-foreground text-[0.7rem]">
                PDF Only, 2 MB max
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit application</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default function ApplyForm() {
  return (
    <form className="shadow  sm:mx-8 px-5 py-3 rounded-xl outline">
      <h2 className="mb-4 font-semibold">Application</h2>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="grid gap-2">
          <Label htmlFor="full-name">Full name *</Label>
          <Input id="full-name" name="name" placeholder="Yassine Alaoui" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email address *</Label>
          <Input id="email" name="email" placeholder="example@mail.com" />
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="resume">Resume *</Label>
          <Input id="resume" name="resume" type="file" />
        </div>
        <div className="grid gap-2 -mt-1">
          <p className="text-muted-foreground text-[0.7rem]">
            PDF Only, 2 MB max
          </p>
        </div>
      </div>
      <div className="flex pt-5 sm:justify-end">
        <Button type="submit">Submit application</Button>
      </div>
    </form>
  )
}
