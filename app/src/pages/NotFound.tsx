import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CloudOff } from "lucide-react"

export default function NotFound() {
  const [mounted, setMounted] = useState(false)
  const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/");
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        },  5000); // 5s

        return () => clearTimeout(timer); // cleanup timer
    }, [navigate]);

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center text-primary">404</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <CloudOff className="w-24 h-24 text-muted-foreground" />
          </motion.div>
          <Separator />
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl font-semibold text-center"
          >
            Oops! Page not found
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center text-muted-foreground"
          >
            The page you are looking for seems to have disappeared from the cloud.
          </motion.p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button asChild onClick={handleGoBack}>
              <Link to="/" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to home page</span>
              </Link>
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </div>
  )
}