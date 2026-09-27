import { useEffect } from "react";
import { toast } from "react-hot-toast";
import type { ToastProps } from "./ToastProps.ts";

export function Toast ({message, type = "success"} : ToastProps) {
    useEffect(() => {
        if (type === "success") {
            toast.success(message);
        } else if (type === "error") {
            toast.error(message);
        } else if (type === "loading") {
            toast.loading(message);
        }
    }, [message, type]);
    return null;
}