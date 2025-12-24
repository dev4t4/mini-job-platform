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
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'

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
  const form = useForm({
    validators: {
      // Pass a schema or function to validate
      onChange: z.object({
        fullname: z.string(),
        email: z.string().email(),
        resume: z
          .custom<FileList>()
          .refine((f) => f && f.length === 1, 'Only 1 File is required')
          .transform((f) => f[0])
          .refine((f) => f.type === 'application/pdf', 'Only PDF allowed')
          .refine((f) => f.size <= 2 * 1024 * 1024, 'Max 2MB'),
      }),
    },
    onSubmit: async ({ value }: { value: { [key: string]: any } }) => {
      const formData = new FormData()
      formData.set('resume', value['resume'])
      formData.set('fullname', value['fullname'])
      formData.set('email', value['email'])
      try {
        const res = await fetch('http://localhost:3001/api/upload', {
          method: 'POST',
          body: formData,
        })
        if (!res.ok) throw new Error('Upload failed')
        form.reset()
        alert('Uploaded successfully!')
      } catch (err) {
        console.error(err)
      }
      //alert(JSON.stringify(value, null, 2))
      console.log('45', value, formData)
    },
  })
  return (
    <form
      className="shadow  sm:mx-8 px-5 py-3 rounded-xl outline"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <h2 className="mb-4 font-semibold">Application</h2>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="grid gap-2">
          <form.Field
            name="fullname"
            children={(field) => (
              <>
                <Label htmlFor="full-name">
                  Full name *
                  {!field.state.meta.isValid && (
                    <em>
                      {field.state.meta.errors.map((e) => (
                        <span>{e?.message}</span>
                      ))}
                    </em>
                  )}
                </Label>
                <Input
                  id="full-name"
                  value={field.state.value}
                  name={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Yassine Alaoui"
                />
              </>
            )}
          />
        </div>
        <div className="grid gap-2">
          <form.Field
            name="email"
            children={(field) => (
              <>
                <Label htmlFor="email">
                  Email address *
                  {!field.state.meta.isValid && (
                    <em>
                      {field.state.meta.errors.map((e) => (
                        <span>{e?.message}</span>
                      ))}
                    </em>
                  )}
                </Label>
                <Input
                  id="email"
                  value={field.state.value as string}
                  name={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="example@mail.com"
                />
              </>
            )}
          />
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <form.Field
            name="resume"
            children={(field) => (
              <>
                <Label htmlFor="resume">
                  Resume *{' '}
                  {!field.state.meta.isValid && (
                    <em>
                      {field.state.meta.errors.map((e) => (
                        <span>{e?.message}</span>
                      ))}
                    </em>
                  )}
                </Label>
                <Input
                  multiple
                  id="resume"
                  name={field.name}
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => field.handleChange(e.target.files)}
                />
              </>
            )}
          />
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
