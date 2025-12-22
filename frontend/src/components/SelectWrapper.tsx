import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type SelectWrapperProps = {
  className?: string
  items: string[]
  placeHolder: string
  value?: string
  onChange?: React.Dispatch<React.SetStateAction<string>>
}

export function SelectWrapper({
  items,
  placeHolder,
  value,
  onChange,
  className,
}: SelectWrapperProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((selectItem) => (
          <SelectItem className={className} value={selectItem}>
            {selectItem}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
