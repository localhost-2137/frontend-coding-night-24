import {cn} from "@/lib/utils";
import {useAtom} from "jotai";
import {ReactNode} from "react";
import {alertAtom} from "@/atoms/alertAtom.ts";

export default function Wrapper({
                                    className,
                                    children,
                                    animation = false,
                                    delay = 0.2,
                                }: {
    className?: string;
    children: ReactNode;
    animation?: boolean;
    delay?: number;
}): JSX.Element {

    const [alert] = useAtom(alertAtom)

    return (
        <div
            style={{animationDelay: `${delay}s`}}
            className={cn(
                className,
                `w-full h-full border-4 border-gray-800 rounded-xl bg-black/80 shadow-gray-800/60 text-white shadow-md ${
                    animation && "animate-slideAndAppear"
                }`, alert && "border-red-500"
            )}
        >
            {children}
        </div>
    );
}
