import { Loader } from "lucide-react"

export default function FancyLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80">
      <Loader className="w-10 h-10 animate-spin bg-primary" />
    </div>
  )
}