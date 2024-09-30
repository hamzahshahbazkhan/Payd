'use client'

import { Button } from "@repo/ui"
import { Card } from "@repo/ui"
import { Center } from "@repo/ui"
import { Select } from "@repo/ui"
import { Input } from "@repo/ui"
import { useState } from "react"
import { Label } from "@repo/ui"

const SUPPORTED_BANKS = [
    {
        name: "HDFC Bank",
        redirectUrl: "https://netbanking.hdfcbank.com"
    },
    {
        name: "Axis Bank",
        redirectUrl: "https://www.axisbank.com"
    }
]

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl)
    return (
        <Card>
            <div className="w-50">
                <div className='flex'>
                    <Label>Amount</Label>
                    <Input placeholder={"Amount"} onChange={() => {

                    }} />
                </div>

                <div className="py-4 text-left">
                    Bank
                </div>
                <Select onChange={(value) => {
                    setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
                }} options={SUPPORTED_BANKS.map(x => ({
                    key: x.name,
                    value: x.name
                }))} />
                <div className="flex justify-center pt-4">
                    <Button onClick={() => {
                        window.location.href = redirectUrl || "";
                    }}>
                        Add Money
                    </Button>
                </div>
            </div>
        </Card>
    )
}