'use client'

import { getOrg } from "@/actions/test"

export function TesterButton() {

    return (
        <button onClick={() => getOrg("org_2zvxo8Q1rG4VjFlnHAUJAcS4lBQ")}>Test</button>
    )
}