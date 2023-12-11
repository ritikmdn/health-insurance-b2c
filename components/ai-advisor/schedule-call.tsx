import { Phone } from 'lucide-react';
import Link from "next/link";

export default function ScheduleCall() {
    return (
        <Link href="https://bit.ly/simpleinsure_healthinsurance" target="_blank">
            <button className="mx-auto p-5 w-[200px] flex items-center mt-5 rounded-lg border justify-center font-semibold bg-blue-500 h-[50px] text-sm text-white transition-all hover:bg-white hover:text-blue-500">
                <Phone size={16} className="mr-2" aria-hidden="true" />
                Talk to experts
            </button>
        </Link>

    );
}