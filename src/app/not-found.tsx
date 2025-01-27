'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NotFoundPage() {
    const path = usePathname();


    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-6xl font-extrabold font-mono text-rose-400 dark:text-neutral-200">404</h1>
                <h2 className="text-4xl font-bold font-mono text-neutral-900 dark:text-neutral-400 py-2">Page Not Found</h2>
                <p className="text-sm font-semibold font-mono text-neutral-700 dark:text-neutral-400 pb-6 py-1 max-w-2xl">
                    Don&apos;t stress— even the best data can sometimes vanish into the depths of the internet!
                </p>

                <p className="text-sm font-semibold font-mono text-neutral-700 dark:text-neutral-400 py-4 max-w-2xl">
                    If you think this is a mistake, please contact our support team.
                </p>

                <div className="flex items-center justify-center gap-4">
                    <Link href={`${path === "/dashboard" ? "/dashboard" : "/"}`}>
                        <Button>
                            {path === "/dashboard" ? "Back to dashboard" : "Back to home"}
                        </Button>
                    </Link>
                    <Link href="/help-center">
                        <Button>Help center</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

