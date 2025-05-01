"use client"
import { X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-0 right-0 z-50 flex flex-col gap-2 p-4 max-w-md w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "p-4 rounded-md shadow-md flex justify-between items-start",
            "transform transition-all duration-300 ease-in-out",
            "animate-in slide-in-from-right-full",
            toast.variant === "destructive"
              ? "bg-destructive text-destructive-foreground"
              : "bg-background text-foreground border",
          )}
        >
          <div className="grid gap-1">
            <h3 className="font-medium">{toast.title}</h3>
            {toast.description && <p className="text-sm opacity-90">{toast.description}</p>}
          </div>
          <button onClick={() => dismiss(toast.id)} className="ml-4 p-1 rounded-full hover:bg-muted">
            <X className="h-4 w-4" />
            <span className="sr-only">Đóng</span>
          </button>
        </div>
      ))}
    </div>
  )
}
