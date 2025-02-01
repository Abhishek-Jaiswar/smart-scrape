import Logo from "@/components/Logo"
import { ModeToggle } from "@/components/ThemeModeToggle"
import { Separator } from "@/components/ui/separator"
import { ReactNode } from "react"

const WorkflowLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className=" flex flex-col w-full h-screen">
            {children}

            <Separator />
            <footer className="flex items-center justify-between p-2">
                <Logo fontSize="text-xl" />
                <ModeToggle />
            </footer>
        </div>
    )
}

export default WorkflowLayout