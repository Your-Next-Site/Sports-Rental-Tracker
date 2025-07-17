'use client'
import { useSetTabNavigation } from "@/hooks/hooks"

export default function SetSearchParams() {
    // This component is not visual and is to set the search params when there are none
    useSetTabNavigation()
    return null
}