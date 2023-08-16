import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Profile() {
    return <main className="w-full p-6 mx-auto">
        <div className="w-full max-w-full px-3 m-auto flex-0 lg:w-8/12 h-full">
            <form className="w-full bg-white p-3 lg:p-5">
                <h5 className="mb-3 font-bold dark:text-white">Thông tin</h5>
                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                    <div>
                        <Label>
                            Họ
                        </Label>
                        <Input id="email" type="text" className="rounded border-gray-500" />
                    </div>
                    <div>
                        <Label>
                            Tên
                        </Label>
                        <Input id="email" type="text" className="rounded border-gray-500" />

                    </div>
                    <div>
                        <Label>
                            Ngày sinh
                        </Label>
                        <Input id="email" type="text" className="rounded border-gray-500" />
                    </div>
                    <div>
                        <Label>
                            Địa chỉ
                        </Label>
                        <Input id="email" type="text" className="rounded border-gray-500" />
                    </div>
                </div>
            </form>
        </div>
    </main>;
}