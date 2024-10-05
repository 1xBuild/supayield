import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function FancyLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card className="p-8 shadow-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01]
          }}
        >
          <motion.div
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 1.5,
              ease: "linear",
              repeat: Infinity
            }}
          >
            <Loader2 className="w-12 h-12 text-primary" />
          </motion.div>
        </motion.div>
        <motion.p
          className="mt-4 text-lg font-medium text-center text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          Loading in progress...
        </motion.p>
      </Card>
    </div>
  )
}