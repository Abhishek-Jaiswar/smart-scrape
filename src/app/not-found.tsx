import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-6xl font-extrabold font-mono text-rose-400">404</h1>
                <h2 className="text-4xl font-bold font-mono text-neutral-900 py-2">Page Not Found</h2>
                <p className="text-sm font-semibold font-mono text-neutral-700 pb-6 py-1 max-w-2xl">
                    Don&apos;t stress— even the best data can sometimes vanish into the depths of the internet!
                </p>

                <p className="text-sm font-semibold font-mono text-neutral-700 py-4 max-w-2xl">
                    If you think this is a mistake, please contact our support team.
                </p>

                <div className="flex items-center justify-center gap-4">
                    <Link href="/dashboard">
                        <Button>Back to dashboard</Button>
                    </Link>
                    <Link href="/help-center">
                        <Button>Help center</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

