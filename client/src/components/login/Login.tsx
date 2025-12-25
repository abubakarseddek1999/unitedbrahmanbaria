import { ArrowLeft, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import Link from "next/link"
import { Input } from "../ui/input"
import { Label } from "@/components/ui/label"

interface LoginProps {
    handleLogin: (event: React.FormEvent) => void;
    loginData: { username: string; password: string };
    setLoginData: React.Dispatch<React.SetStateAction<{ username: string; password: string }>>;
    isLoading: boolean;
}

export const Login: React.FC<LoginProps> = ({ handleLogin, loginData, setLoginData, isLoading }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md pb-5">
                <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">অ্যাডমিন লগইন</CardTitle>
                    <CardDescription>অ্যাডমিন প্যানেলে প্রবেশ করুন</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <Label htmlFor="username">ইউজারনেম</Label>
                            <Input
                                id="username"
                                type="text"
                                value={loginData.username}
                                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                                placeholder="Enter your username"
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">পাসওয়ার্ড</Label>
                            <Input
                                id="password"
                                type="password"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                placeholder="Enter your password"
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "লগইন হচ্ছে..." : "লগইন করুন"}
                        </Button>
                    </form>
                    {/* <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700">
                            <strong>ডেমো লগইন:</strong>
                            <br />
                            ইউজারনেম: admin
                            <br />
                            পাসওয়ার্ড: admin123
                        </p>
                    </div> */}
                    <div className="mt-4 text-center">
                        <Button variant="outline" asChild>
                            <Link href="/">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                হোমে ফিরুন
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
