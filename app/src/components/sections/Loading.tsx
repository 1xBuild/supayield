import { Loader } from "lucide-react"

export default function FancyLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Loader className="w-10 h-10 animate-spin bg-white" />
    </div>
  )
}