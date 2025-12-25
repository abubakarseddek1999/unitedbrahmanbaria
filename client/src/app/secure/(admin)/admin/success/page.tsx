"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SuccessCardHeader from "./Components/SuccessCardHeader";
import SuccessStoryContent from "./Components/SuccessStoryContent";
import { useState } from "react";

export default function SuccessPage() {
    const [refresh, setRefresh] = useState(false)
    return (
        <div>
            <Card>
                <CardHeader>
                    <SuccessCardHeader setRefresh={setRefresh} />
                </CardHeader>

                <CardContent>
                    <SuccessStoryContent refresh={refresh} setRefresh={setRefresh} />
                </CardContent>
            </Card>
        </div>
    )
}