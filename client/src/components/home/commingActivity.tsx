import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, MapPin, Calendar } from "lucide-react"

interface Event {
    id: string
    title: string
    date: string
    location: string
    description: string
    status: "tomorrow" | "upcoming" | "urgent"
}

const events: Event[] = [
    {
        id: "1",
        title: "🌱 আগামীকাল বৃক্ষরোপণ কর্মসূচি",
        date: "২৬ ডিসেম্বর ২০২৫",
        location: "সদর ব্রাহ্মণবাড়িয়া",
        description:
            "আগামীকাল আমাদের স্বেচ্ছাসেবকদের নিয়ে বৃক্ষরোপণ কর্মসূচি অনুষ্ঠিত হবে। সকল আগ্রহী স্বেচ্ছাসেবকদের নির্দিষ্ট সময়ে উপস্থিত থাকার জন্য অনুরোধ করা হচ্ছে।",
        status: "tomorrow",
    },
    {
        id: "2",
        title: "🛣️ রাস্তা সংস্কার ও পরিষ্কার কার্যক্রম",
        date: "৩০ ডিসেম্বর ২০২৫",
        location: "পৌর এলাকা",
        description: "জনসাধারণের চলাচল সহজ করতে রাস্তা সংস্কার ও পরিষ্কার কার্যক্রম পরিচালনা করা হবে। স্থানীয়দের সহযোগিতা কাম্য।",
        status: "upcoming",
    },
]

function getStatusColor(status: string) {
    switch (status) {
        case "tomorrow":
            return "bg-green-500 text-white"
        case "upcoming":
            return "bg-blue-500 text-white"
        case "urgent":
            return "bg-red-500 text-white"
        default:
            return "bg-gray-500 text-white"
    }
}

function getStatusText(status: string) {
    switch (status) {
        case "tomorrow":
            return "আগামীকাল"
        case "upcoming":
            return "আসন্ন"
        case "urgent":
            return "জরুরি"
        default:
            return status
    }
}

export function UpcomingEvents() {
    return (
        <section className="py-12 px-4 md:py-20">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Bell className="w-6 h-6 text-green-600" />
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">আসন্ন কার্যক্রম</h2>
                    </div>
                    <p className="text-gray-600 text-lg">আমাদের আসন্ন প্রকল্প এবং সামাজিক উদ্যোগ সম্পর্কে জানুন</p>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {events.map((event) => (
                        <Card key={event.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between gap-4">
                                    <CardTitle className="text-xl text-gray-900">{event.title}</CardTitle>
                                    <Badge className={`${getStatusColor(event.status)} shrink-0`}>{getStatusText(event.status)}</Badge>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {/* Event Details */}
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Calendar className="w-5 h-5 text-green-600 flex-shrink-0" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <MapPin className="w-5 h-5 text-green-600 flex-shrink-0" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>

                                {/* Action Button */}
                                <Button className="w-full mb-5 bg-green-600 hover:bg-green-700 text-white mt-6">বিস্তারিত দেখুন</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
